import React from 'react';
import { View, Switch, ViewStyle, Text, StyleSheet, TextInput, TouchableHighlight, Keyboard} from 'react-native';
import _ from 'lodash';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import groupAPI from '../api/group.api';
import store from '../redux/store';
import { GroupType } from '../redux/reducers/group';
import groupActions from '../redux/actions/group';
import toast from '../utils/toast';
import navigation, { ClosableModal } from '../navigation';

import colors from '../style/colors';
import sizes from '../style/sizes';
import wStyles from '../style/wStyles';

interface Props {
    navigator: any;
    group: GroupType;
    settingsPage?: boolean;
}

interface State {
    password: string;
    publicGroup: boolean;
}

export default class GroupInfo extends React.Component<Props, State> implements ClosableModal {

    static navigatorStyle = {...navigation.NavStyle};

    private throttledJoinPublicGroup: any;

    constructor(props: Props) {
        super(props);

        this.state = {
            password: "",
            publicGroup: false,
        };

        this.throttledJoinPublicGroup = _.throttle(this.joinPublicGroup, 2000);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event: any): void {
        if (event.type === "NavBarButtonPress" && event.id === "close") {
            this.props.navigator.dismissModal();
        }
    }

    componentDidMount() {
        if (this.props.group.public) {
            this.setState({
                publicGroup: true,
            });
        }
    }

    componentWillUnmount() {
        toast.hide();
    }

    joinPublicGroup() {
        groupAPI.joinPublicGroup(this.props.group.id, this.state.password).then(() => {
            // refresh user groups after group creation
            store.dispatch(groupActions.getUserGroupsFetchRequested());

            toast.success("Group joined!");
        }).catch((error: any) => {
            let errorMessage = error.response.data.message;
            if (errorMessage !== 'database error') {
                toast.error(errorMessage);
            }
        });
    }

    fetchJoinGroup() {
        Keyboard.dismiss();

        if (this.props.group.locked && this.state.password === "") {
            return;
        }
        
        this.setState({
            password: "",
        });
        
        this.throttledJoinPublicGroup();
    }

    fetchUpdateSettings() {

        groupAPI.updateGroupInfo(this.props.group.id as number, this.state.password, this.state.publicGroup).then(() => {
            toast.success('Group info updated.');

            // refresh the users groups because we pull information from here to display on the page
            store.dispatch(groupActions.getUserGroupsFetchRequested());
            
            // update the public group flag of the currently selected group
            store.dispatch(groupActions.setSelectedGroup({...this.props.group, public: this.state.publicGroup}));
        }).catch(() => {

        });

        this.setState({
            password: "",
        });
    }

    // what the user sees if they access from group search
    insertJoinGroupInformation() {

        return (
            <View>
                {this.props.group.locked &&
                    <TextInput placeholder="Password" secureTextEntry={true} autoCapitalize="none" style={wStyles.textInput} value={this.state.password} onChangeText={(password) => this.setState({password})}/>
                }
                <TouchableHighlight style={wStyles.button} underlayColor={colors.primary} onPress={this.fetchJoinGroup.bind(this)}>
                    <Text style={wStyles.buttonText}>Join Group</Text>
                </TouchableHighlight>
            </View>
        );
    }

    // what the user sees if they access from group settings
    insertUpdateSettingsInformation() {

        return (
            <View>
                <View style={styles.switch}>
                    <Text style={{color: colors.primary, fontSize: sizes.default}}>Public Group</Text>
                    <Switch onValueChange={(publicGroup) => this.setState({publicGroup})}
                            value={this.state.publicGroup} />
                </View>
                {this.state.publicGroup ?
                    <View>
                        <View style={wStyles.divider}/>
                        <TextInput placeholder="Password (Optional)"
                                multiline={false}
                                autoCapitalize="none"
                                secureTextEntry={true}
                                style={wStyles.textInput}
                                value={this.state.password}
                                onChangeText={(password) => this.setState({password})}/>
                    </View>
                : null}
                <TouchableHighlight style={wStyles.button} underlayColor={colors.primary} onPress={this.fetchUpdateSettings.bind(this)}>
                    <Text style={wStyles.buttonText}>Update Settings</Text>
                </TouchableHighlight>
            </View>
        );
    }

    public render() {
        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <Text style={{fontSize: sizes.large, color: colors.primary, marginBottom: 5}}>{this.props.group.name}</Text>
                    <Text style={{fontSize: sizes.small, color: colors.primary}}>{this.props.group.ownerName}</Text>
                    {this.props.group.ownerEmail && <Text style={{fontSize: sizes.small, color: colors.primary}}>{this.props.group.ownerEmail}</Text>}
                    <Text style={{fontSize: sizes.small, color: colors.primary}}>{this.props.group.userCount} {this.props.group.userCount as number > 1 ? 'users' : 'user'}</Text>
                </View>

                {this.props.settingsPage ? this.insertUpdateSettingsInformation() : this.insertJoinGroupInformation()}
                <KeyboardSpacer/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
    } as ViewStyle,
    infoContainer: {
        paddingTop: 50,
        paddingBottom: 20,
        alignItems: 'center',
    } as ViewStyle,
    switch: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 20,
    } as ViewStyle,
});
