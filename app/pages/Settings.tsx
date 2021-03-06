import React from 'react';
import { Linking, View, ViewStyle, StyleSheet, Text, TextStyle, TouchableHighlight } from 'react-native';

// redux
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { UserStateType } from '../redux/reducers/user';
import { GroupStateType } from '../redux/reducers/group';
import groupActions, { GroupActionMapType } from '../redux/actions/group';
import userActions, { UserActionMapType } from '../redux/actions/user';

import navigation, { ClosableModal } from '../navigation';

import colors from '../style/colors';
import sizes from '../style/sizes';
import wStyles from '../style/wStyles';

interface Props {
    navigator: any;
    user: UserStateType;
    group: GroupStateType;
    groupActions: GroupActionMapType;
    userActions: UserActionMapType;
}

interface State {
    notifications: boolean;
}

class Settings extends React.Component<Props, State> implements ClosableModal {

    static navigatorStyle = {...navigation.NavStyle};

    constructor(props: Props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

        this.state = {
            notifications: false,
        };
    }

    onNavigatorEvent(event: any): void {
        if (event.type === "NavBarButtonPress" && event.id === "close") {
            this.props.navigator.dismissModal();
        }
    }

    componentDidMount() {
    }

    private openAppSettings() {
        Linking.openURL('app-settings:');
    }

    // reset states upon logout
    private logout() {
        this.props.userActions.logout();
    }

    private leaveFeedback() {
        this.props.navigator.push({
            screen: "Feedback",
            title: "Feedback",
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight style={[wStyles.button]} underlayColor={colors.light1} onPress={this.openAppSettings.bind(this)}>
                    <Text style={wStyles.buttonText}>Notification Settings</Text>
                </TouchableHighlight>
                <TouchableHighlight style={[wStyles.button]} underlayColor={colors.light1} onPress={this.leaveFeedback.bind(this)}>
                    <Text style={wStyles.buttonText}>Leave Feedback</Text>
                </TouchableHighlight>
                <TouchableHighlight style={[wStyles.button, {backgroundColor:colors.red}]} underlayColor={colors.light1} onPress={this.logout.bind(this)}>
                    <Text style={wStyles.buttonText}>Logout</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
    } as ViewStyle,
    button: {
        backgroundColor: colors.red,
        marginBottom: 0,
        borderBottomWidth: 0,
    } as ViewStyle,
    setting: {
        height: 50,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.light1,
    } as ViewStyle,
    settingText: {
        fontSize: sizes.default,
        color: colors.primary,
    } as TextStyle,
});

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

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
