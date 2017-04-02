import _ from 'lodash';
import React from 'react';
import { View, ViewStyle, TextStyle, KeyboardAvoidingView, Text, TextInput, StyleSheet, TouchableHighlight } from 'react-native';

interface Props {
    navigator: any,
}

interface State {
    groupName: string;
    password: string;
    errorMessage: string,
}

export default class CreateGroup extends React.Component<Props, State> {

    private defaultState: State = {
        groupName: "",
        password: "",
        errorMessage: " ",
    };

    constructor() {
        super();

        this.state = _.clone(this.defaultState);
    }


    fetchCreateUser(): void {
        let password = this.state.password;
        let groupName = this.state.groupName;
        
        if (groupName === "" || password === "") {

            this.setState({
                errorMessage: "Please fill in all fields.",
            });

            return;
        }

    }

    public render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View>
                    <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
                    <TextInput placeholder="Group Name" autoCapitalize="none" style={styles.textInput} value={this.state.groupName} onChangeText={(groupName) => this.setState({groupName})}/>
                    <TextInput placeholder="Password" autoCapitalize="none" style={styles.textInput} value={this.state.password} onChangeText={(password) => this.setState({password})}/>
                </View>

                <TouchableHighlight style={styles.submitButton} activeOpacity={50} underlayColor={'red'} onPress={ this.fetchCreateUser.bind(this) }>
                    <Text>Create Account</Text>
                </TouchableHighlight>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,
    textInput: {
        marginBottom: 5,
        padding: 10,
        height: 40,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 2,
    } as TextStyle,
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
    errorMessage: {
        color: "red",
    } as TextStyle,
});
