import React from 'react';
import { View, ViewStyle, Vibration, TextStyle, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// redux
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { UserStateType } from '../redux/reducers/user';
import { GroupStateType } from '../redux/reducers/group';
import groupActions, { GroupActionMapType } from '../redux/actions/group';
import userActions, { UserActionMapType } from '../redux/actions/user';

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

            setTimeout(() => {
                this.setState({
                    waypointToggle: false,
                    markers: [...this.state.markers, newMarker],
                });
            });
        }
    }

    onPing() {
        Vibration.vibrate([0], false);
    }

    onWaypoint() {
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
                        
                            {this.state.markers.map((marker: Marker, index: number) => {
                                return (
                                    <MV.Marker  key={index}
                                                coordinate={marker.latlng}
                                                title={marker.title}
                                                description={marker.description}>
                                                    <Icon style={{fontSize: sizes.xLarge, color: colors.red}} name="map-marker"/>
                                                </MV.Marker>
                                );
                            })}

                        </MV>

                            <View style={styles.buttonContainer}>
                                <TouchableHighlight style={[styles.button, {backgroundColor: !this.state.waypointToggle ? colors.dark2 : colors.red}]}
                                                    onPress={this.onWaypoint.bind(this)}
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
    user: state.user,
    group: state.group,
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>): any {
  return {
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
