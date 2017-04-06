import React from 'react';
import { View, ViewStyle, StyleSheet, Text, TouchableHighlight } from 'react-native';

interface Props {
    navigator: any,
}

interface State {

}

export default class GroupSegue extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    private navigateCreateGroup() {
        this.props.navigator.push({
            screen: "CreateGroup",
        });
    }

    private navigateGroupSearch() {
        this.props.navigator.push({
            screen: "GroupSearch",
        });
    }

    render() {
        return (
            <View style={styles.container}>

                <TouchableHighlight style={styles.submitButton} activeOpacity={50} underlayColor={'red'} onPress={this.navigateCreateGroup.bind(this)}>
                    <Text>Create Group</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.submitButton} activeOpacity={50} underlayColor={'red'} onPress={this.navigateGroupSearch.bind(this)}>
                    <Text>Join Group</Text>
                </TouchableHighlight>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,
    submitButton: {
        marginBottom: 10,
        marginTop: 5,
        backgroundColor: "blue",
        height: 50,
        width: 200,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    } as ViewStyle,
});
