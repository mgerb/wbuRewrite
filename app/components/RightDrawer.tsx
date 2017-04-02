import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

interface Props {
    navigator: any,
}

interface State {

}

export default class RightDrawer extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Text>This is a test!</Text>
                <Text>This is a test!</Text>
                <Text>This is a test!</Text>
                <Text>This is a test!</Text>
                <Text>This is a test!</Text>
                <Text>......</Text>
                <Text>......</Text>
                <Text>......</Text>
                <Text>......</Text>
                <Text>......</Text>


                <TouchableHighlight activeOpacity={50} onPress={() => {this.props.navigator.push({screen: 'CreateUser'})}}>
                    <Text>Create Group</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

