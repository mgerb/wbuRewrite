import React from 'react';
import { Text, View, ViewStyle, Vibration, TextStyle, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';
import _ from 'lodash';
import moment, { Moment } from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// redux
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { GeoStateType, GeoLocationType } from '../redux/reducers/geo';
import { GroupStateType } from '../redux/reducers/group';
import { UserStateType } from '../redux/reducers/user';
import geoActions, { GeoActionMapType } from '../redux/actions/geo';
import groupActions, { GroupActionMapType } from '../redux/actions/group';
import userActions, { UserActionMapType } from '../redux/actions/user';

import geoAPI from '../api/geo.api';
import navigation, { ClosableModal } from '../navigation';
import MV from 'react-native-maps';
import time from '../utils/time';

import colors from '../style/colors';
import sizes from '../style/sizes';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.008;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

interface Props {
    navigator: any;
    user: UserStateType;
    group: GroupStateType;
    geo: GeoStateType;
    geoActions: GeoActionMapType;
    groupActions: GroupActionMapType;
    userActions: UserActionMapType;
}

interface RegionType {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

interface State {
    latitude?: number;
    longitude?: number;
    region?: RegionType;
    waypointToggle: boolean;
    markers: Array<Marker>;
}

interface Marker {
    title: string;
    description: string;
    latlng: LatLng;
}

interface LatLng {
    latitude: number;
    longitude: number;
}

class MapView extends React.Component<Props, State>  implements ClosableModal {

    static navigatorStyle = {...navigation.NavStyle};

    private mapRef: any;
    private oneDay: Moment;
    private throttledStoreGeoLocation: any;

    constructor(props: Props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.state = {
            waypointToggle: false,
            markers: [],
        };
        
        this.throttledStoreGeoLocation = _.throttle(this.storeGeoLocation, 2000);
    }

    onNavigatorEvent(event: any): void {
        if (event.type === "NavBarButtonPress" && event.id === "close") {
            this.props.navigator.dismissModal();
        }
    }

    componentDidMount() {

        this.oneDay = moment().subtract(1, "d");


        navigator.geolocation.getCurrentPosition((position: any) => {

            this.setState({
                region: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                },
            });

            // get locations from storage/server after getting current position
            this.props.geoActions.getGeoLocationsFromStorage(this.props.user.id as number, this.props.group.selectedGroup.id as number);

        }, () => {
            alert("Please enable geolocation to use this feature.");
        });
    }

    componentWillReceiveProps(nextProps: Props) {
        if (!!this.mapRef && this.props.geo.geoLocations !== nextProps.geo.geoLocations) {
            const geoLocations = _.reject(nextProps.geo.geoLocations, (geo: GeoLocationType) => {
                return moment.unix(geo.timestamp as number) < this.oneDay;
            });

            if (geoLocations.length === 1) {
                setTimeout(() => {
                    this.mapRef.animateToRegion({
                        latitude: geoLocations[0].latitude,
                        longitude: geoLocations[0].longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    });
                });
            } else if (geoLocations.length > 1) {
                setTimeout(() => {
                    this.mapRef.fitToCoordinates(geoLocations, {
                        edgePadding: {top:50,right:50,bottom:50,left:50},
                        animated: true,
                    });
                });
            }
        }
    }

    onMapPress(event: any) {
        if (this.state.waypointToggle) {

            // buzzzz!
            Vibration.vibrate([0], false);

            // get coords from tap
            let latlng: LatLng = event.nativeEvent.coordinate;

            this.updateGeoLocationState(latlng.latitude.toString(), latlng.longitude.toString(), true);

            this.throttledStoreGeoLocation(latlng.latitude, latlng.longitude, "true");

            this.setState({
                waypointToggle: false,
            });
        }
    }

    updateGeoLocationState(latitude: string, longitude: string, waypoint: boolean) {
        
        // create a new marker
        let newGeoLocation: GeoLocationType = {
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            groupID: this.props.group.selectedGroup.id,
            userID: this.props.user.id,
            latitude: latitude,
            longitude: longitude,
            waypoint: waypoint,
            timestamp: moment().unix(),
        };

        let newEntry = true;
        let newGeoLocationList: Array<GeoLocationType> = _.map(this.props.geo.geoLocations, (geo: GeoLocationType) => {
            if (geo.userID === this.props.user.id && geo.waypoint === waypoint) {
                newEntry = false;
                return newGeoLocation;
            } else {
                return geo;
            }
        });

        // if there was no entry updated we still need to insert location into the list
        if (newEntry) {
            newGeoLocationList = _.concat(newGeoLocationList, newGeoLocation);
        }

        this.props.geoActions.setGeoLocations(newGeoLocationList);
    }

    storeGeoLocation(latitude: number, longitude: number, waypoint: string) {
        geoAPI.storeGeoLocation(this.props.group.selectedGroup.id as number, latitude, longitude, waypoint).then(() => {
        }).catch((error: any) => {
            console.log(error);
        });
    }

    onPing() {
        Vibration.vibrate([0], false);

        navigator.geolocation.getCurrentPosition((position: any) => {
            const latitude = position.coords.latitude as number;
            const longitude = position.coords.longitude as number;

            this.updateGeoLocationState(latitude.toString(), longitude.toString(), false);
            this.throttledStoreGeoLocation(latitude, longitude, "false");
        });
    }

    onWaypointToggle() {
        this.setState({
            waypointToggle: !this.state.waypointToggle,
        });
    }

    insertMarkers() {

        return this.props.geo.geoLocations.map((location: GeoLocationType, index: number) => {
            const latlng: LatLng = {
                latitude: parseFloat(location.latitude as string),
                longitude: parseFloat(location.longitude as string),
            };

            const iconColor = location.userID === this.props.user.id ? colors.purple : colors.red;
            
            // don't show markers if they are more than a day old
            if (moment.unix(location.timestamp as number) < this.oneDay) {
                return null;
            }

            return (
                <MV.Marker  key={index}
                            coordinate={latlng}
                            title={location.firstName + " " + location.lastName}
                            description={time.timestamp(location.timestamp as number)}>
                                <View style={{alignItems:'center'}}>
                                    <Icon style={{ fontSize: sizes.xLarge,color:iconColor}}
                                            name={location.waypoint ? 'map-marker' : 'map-marker-radius'}/>
                                    <Text style={{color:colors.primary}}>{location.firstName}</Text>
                                    <Text style={{color:colors.primary}}>{location.lastName}</Text>
                                </View>
                </MV.Marker>
            );
        });
    }

    render() {
        return (
            <View style={{flex:1}}>
                {this.state && this.state.region ?
                    <View style={{flex:1}}>

                        <MV style={{flex:1}}
                            ref={(ref: any) => {this.mapRef = ref;}}
                            onPress={this.onMapPress.bind(this)}
                            showsUserLocation={true}
                            showsMyLocationButton={true}
                            initialRegion={this.state.region}>
                        
                            {this.insertMarkers()}
                        </MV>

                            <View style={styles.buttonContainer}>
                                <TouchableHighlight style={[styles.button, {backgroundColor: !this.state.waypointToggle ? colors.dark2 : colors.red}]}
                                                    onPress={this.onWaypointToggle.bind(this)}
                                                    underlayColor={colors.red}>
                                    <Icon style={styles.buttonText} name="map-marker"/>
                                </TouchableHighlight>
                                <TouchableHighlight style={[styles.button, {backgroundColor: colors.dark2, borderLeftWidth:1}]}
                                                    onPress={this.onPing.bind(this)}
                                                    underlayColor={colors.dark1}>
                                    <Icon style={[styles.buttonText, {color: colors.white}]} name="map-marker-radius"/>
                                </TouchableHighlight>
                            </View>
                    </View>
                : null}
             </View>
        );
    }
}

function mapStateToProps(state: Props): any {
  return {
    geo: state.geo,
    group: state.group,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>): any {
  return {
    geoActions: bindActionCreators(geoActions, dispatch),
    groupActions: bindActionCreators(groupActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapView);

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: colors.light1,
        height: 70,
    } as ViewStyle,
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.dark1,
    } as ViewStyle,
    buttonText: {
        fontSize: sizes.xLarge,
        color: colors.white,
    } as TextStyle,
});
