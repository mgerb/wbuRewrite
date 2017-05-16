import React from 'react';
import { AppState, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import moment from 'moment';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import ChatScrollView from '../components/ChatScrollView';
import ChatInput from '../components/ChatInput';
import DashboardNavigator from '../components/DashboardNavigator';

// redux
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { UserStateType } from '../redux/reducers/user';
import { GroupStateType } from '../redux/reducers/group';
import userActions, { UserActionMapType } from '../redux/actions/user';
import groupActions, { GroupActionMapType } from '../redux/actions/group';

import fcm from '../utils/fcm';
import navigation from '../navigation';
import storage from '../utils/storage';

import colors from '../style/colors';
import sizes from '../style/sizes';

interface Props {
    navigator: any;
    userActions: UserActionMapType;
    groupActions: GroupActionMapType;
    user: UserStateType;
    group: GroupStateType;
}

interface State {
    showWelcomeMessage: boolean;
    appState: string;
}

class Dashboard extends React.Component<Props, State> {
    
    constructor(props: Props) {
        super(props);
        this.state = {
            showWelcomeMessage :false,
            appState: AppState.currentState,
        };
        this.handleAppStateChange = this.handleAppStateChange.bind(this);
    }

    componentDidMount() {
        if (!this.props.user.loggedIn) {
            storage.getUserState().then((state) => {
                if (!state) {
                    navigation.Login();
                } else {
                    // perform application bootstrap here
                    // log the user in with stored state
                    this.props.userActions.loginFetchSucceeded(state);
                }
            });
        }
        
        AppState.addEventListener('change', this.handleAppStateChange);
        fcm.requestPermissions();
        fcm.startListeners();
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
        fcm.removeListeners();
    }

    componentWillReceiveProps(nextProps: Props) {
        if ((!this.props.group.getUserGroupsFetchSucceeded && nextProps.group.getUserGroupsFetchSucceeded) ||
            (!this.props.group.getUserGroupsFetchFailed && nextProps.group.getUserGroupsFetchFailed)) {
            if (nextProps.group.groups.length < 1) {
                this.setState({
                    showWelcomeMessage: true,
                });
            }
        }

        // keep checking if use joins a group to remove welcome message
        if (this.state.showWelcomeMessage) {
            if (nextProps.group.groups.length > 0) {
                this.setState({
                    showWelcomeMessage: false,
                });
            }
        }
    }

    private handleAppStateChange(nextAppState: any): void {
        if (!this.props.user.loggedIn) {
            return;
        }

        // when the app comes into the foreground
        if (this.state.appState === "background" && nextAppState === "active") {
            this.props.groupActions.getGroupMessagesFetchRequested(this.props.group.selectedGroup.id as number);

            // check refresh token time is more than 2 days old
            if ((this.props.user.lastRefreshTime as number) < moment().subtract(2, "d").unix()) {
                this.props.userActions.refreshJWTFetchRequested();
            }

            // remove all deliverd FCM notifications
            fcm.removeAllDeliveredNotifications();
        }

        this.setState({
            appState: nextAppState,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <DashboardNavigator navigator={this.props.navigator} selectedGroup={this.props.group.selectedGroup}/>

                {this.state.showWelcomeMessage ?
                <View style={styles.introMessageContainer}>
                    <Text style={styles.introMessage}>Join or create a group to start!</Text>
                </View> :
                <ChatScrollView/>}

                {!this.state.showWelcomeMessage ? <ChatInput/> : null}
                <KeyboardSpacer/>
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
    userActions: bindActionCreators(userActions, dispatch),
    groupActions: bindActionCreators(groupActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.dark3,
    } as ViewStyle,
    introMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    } as ViewStyle,
    introMessage: {
        fontSize: sizes.large,
        color: colors.white,
        textAlign: 'center',
    } as TextStyle,
});
