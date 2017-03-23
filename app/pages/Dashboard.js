// @flow
import React from 'react';
import { View, Text } from 'react-native';

import facebook from '../utils/facebook';
import fcm from '../utils/fcm';

export default class Dashboard extends React.Component {

    componentDidMount() {
        fcm.requestPermissions();
        fcm.getFCMToken();
        fcm.startListeners();
    }

    componentWillUnmount() {
        fcm.removeListeners();
    }

    render(): any {
        return (
            <View style={{flex: 1}}>
                <Text>This is a test!</Text>
                <Text>This is a test!</Text>
                <Text>This is a test!</Text>
                <Text>This is a test!</Text>
                <Text>This is a test!</Text>
            </View>
        )
    }
}
