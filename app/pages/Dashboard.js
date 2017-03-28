// @flow

import React from 'react';
import { View, Text } from 'react-native';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as userActions from '../redux/actions/user';
import * as groupActions from '../redux/actions/group';

import fcm from '../utils/fcm';
import navigation from '../navigation';

class Dashboard extends React.Component {

    componentWillMount() {
        navigation.Login();
    }

    componentDidMount() {
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
            </View>
        );
    }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    group: state.group,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    groupActions: bindActionCreators(groupActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
