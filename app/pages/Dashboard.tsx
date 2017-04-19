import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
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

}

class Dashboard extends React.Component<Props, State> {
    
    constructor(props: Props) {
        super(props);
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

        fcm.requestPermissions();
        fcm.getFCMToken();
        fcm.startListeners();

    }

    componentWillUnmount() {
        fcm.removeListeners();
    }

    private userHasGroups(): boolean {
        return this.props.group.groups.length > 0 && this.props.group.getUserGroupsFetchSucceeded;
    }

    render() {
        return (
            <View style={styles.container}>
                <DashboardNavigator navigator={this.props.navigator} selectedGroup={this.props.group.selectedGroup}/>

                {!this.userHasGroups() ?
                <View style={styles.introMessageContainer}>
                    <Text style={styles.introMessage}>Join or create a group to start!</Text>
                </View> :
                <ChatScrollView/>}

                {this.userHasGroups() ? <ChatInput selectedGroup={{...this.props.group.selectedGroup}}/> : null}
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
    } as TextStyle,
});
