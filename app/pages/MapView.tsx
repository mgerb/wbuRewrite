import React from 'react';
import { View, ViewStyle, Vibration, TextStyle, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';
import moment from 'moment';
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

    constructor(props: Props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.state = {
            waypointToggle: false,
            markers: [],
        };
    }

    onNavigatorEvent(event: any): void {
        if (event.type === "NavBarButtonPress" && event.id === "close") {
            this.props.navigator.dismissModal();
        }
    }

    componentDidMount() {

        this.props.geoActions.getGeoLocationsFetchRequested(this.props.group.selectedGroup.id);

        navigator.geolocation.getCurrentPosition((position: any) => {
            this.setState({
                region: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                },
            });
        }, () => {
            alert("Please enable geolocation to use this feature.");
        });
    }

    onRegionChange(region: any) {
        console.log(region);
    }

    onMapPress(event: any) {
        if (this.state.waypointToggle) {

            this.setState({
                markers: [],
            });

            // buzzzz!
            Vibration.vibrate([0], false);

            // get coords from tap
            let latlng: LatLng = event.nativeEvent.coordinate;

            // create a new marker
            let newMarker: Marker = {
                latlng: latlng,
                title: "test",
                description: time.timestamp(moment().unix()),
            };

            this.storeGeoLocation(latlng.latitude, latlng.longitude, "true");

            setTimeout(() => {
                this.setState({
                    waypointToggle: false,
                    markers: [...this.state.markers, newMarker],
                });
            });
        }
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

            this.storeGeoLocation(latitude, longitude, "false");
        });
    }

    onWaypointToggle() {
        this.setState({
            waypointToggle: !this.state.waypointToggle,
        });
    }

    render() {
        return (
            <View style={{flex:1}}>
                {this.state && this.state.region ?
                    <View style={{flex:1}}>

                        <MV style={{flex:1}}
                            onRegionChange={this.onRegionChange.bind(this)}
                            onPress={this.onMapPress.bind(this)}
                            showsUserLocation={true}
                            showsMyLocationButton={true}
                            initialRegion={this.state.region}>
                        
                            {this.props.geo.geoLocations.map((location: GeoLocationType, index: number) => {
                                const latlng: LatLng = {
                                    latitude: parseFloat(location.latitude as string),
                                    longitude: parseFloat(location.longitude as string),
                                };

                                return (
                                    <MV.Marker  key={index}
                                                coordinate={latlng}
                                                title={location.firstName + " " + location.lastName}
                                                description={time.timestamp(location.timestamp as number)}>
                                                    <Icon style={{fontSize: sizes.xLarge, color: colors.red}} name="map-marker"/>
                                                </MV.Marker>
                                );
                            })}

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
                                    <Icon style={[styles.buttonText, {color: colors.cyan}]} name="map-marker-radius"/>
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
