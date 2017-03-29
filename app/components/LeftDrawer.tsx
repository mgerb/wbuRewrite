import React from 'react';
import { View, Text } from 'react-native';

interface Props {

}

interface State {

}

export default class LeftDrawer extends React.Component<Props, State> {

    render() {
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

