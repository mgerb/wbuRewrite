// @flow
import React from 'react';
import { View, Text } from 'react-native';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../redux/actions/app';

import facebook from '../utils/facebook';
import fcm from '../utils/fcm';

class Dashboard extends React.Component {

    componentDidMount() {
        fcm.requestPermissions();
        fcm.getFCMToken();
        fcm.startListeners();


        this.props.appActions.fetchLogin();
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

                {this.props.app.loggedIn ? <Text>Logged in!</Text> : null}
            </View>
        );
    }
}

function mapStateToProps(state) {
  return {
    app: state.app,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
