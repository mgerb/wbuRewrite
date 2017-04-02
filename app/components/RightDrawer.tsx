import React from 'react';
import { View, Text } from 'react-native';

interface Props {
    navigator: any,
}

interface State {

}

export default class RightDrawer extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    private navigateCreateGroup() {
        this.props.navigator.showModal({
            screen: "CreateGroup",
            navigatorStyle: {
                navBarHidden: true,
            },
        })
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


                <Text onPress={this.navigateCreateGroup.bind(this)}>Create Group</Text>
            </View>
        )
    }
}

