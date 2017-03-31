import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

// redux
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { UserStateType } from '../redux/reducers/user';

import userActions, { actionMapType as UserActionMapType } from '../redux/actions/user';
import groupActions from '../redux/actions/group';

import fcm from '../utils/fcm';
import navigation from '../navigation';
import storage from '../utils/storage';

interface Props {
    navigator: any,
    userActions: UserActionMapType,
    groupActions: any,
    user: UserStateType,
    group: any,
}

interface State {
}

class Dashboard extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.user.loggedIn) {
            storage.getUserLogin().then((state) => {
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

    render() {
        return (
            <View style={{flex: 1}}>
                <Text>This is a test!</Text>
                <View><Text>test 123</Text></View>
                <Text>This is a test!</Text>
                <Text>This is a test!</Text>
                <Text>This is a test!</Text>
                <Text>This is a test!</Text>

                {this.props.user.loggedIn ? <Text>Logged in!</Text> : null}

                <TouchableHighlight>
                    <Text onPress={() => this.props.userActions.logout()}>New User</Text>
                </TouchableHighlight>
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
