import _ from 'lodash';
import React from 'react';
import ReactNative, { View, KeyboardAvoidingView, Text, TextInput, StyleSheet, TouchableHighlight } from 'react-native';

interface Props {
    navigator: any,
}

interface State {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    errorMessage: string,
}


export default class CreateUser extends React.Component<Props, State> {

    private defaultState: State = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        errorMessage: "",
    };

    constructor() {
        super();

        this.state = _.clone(this.defaultState);
    }


    fetchCreateUser() {
        this.setState(this.defaultState);
        this.props.navigator.pop({animated: true});
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>

                <View>
                    <TextInput placeholder="First Name" autoCapitalize="none" style={styles.textInput} value={this.state.firstName} onChangeText={(firstName) => this.setState({firstName})}/>
                    <TextInput placeholder="Last Name" autoCapitalize="none" style={styles.textInput} value={this.state.lastName} onChangeText={(lastName) => this.setState({lastName})}/>
                    <TextInput placeholder="Email" autoCapitalize="none" style={styles.textInput} value={this.state.email} onChangeText={(email) => this.setState({email})}/>
                    <TextInput placeholder="Password" autoCapitalize="none" style={styles.textInput} value={this.state.password} onChangeText={(password) => this.setState({password})}/>
                    <TextInput placeholder="Confirm Password" autoCapitalize="none" style={styles.textInput} value={this.state.confirmPassword} onChangeText={(confirmPassword) => this.setState({confirmPassword})}/>
                </View>

                <TouchableHighlight>
                    <Text style={styles.submitButton} onPress={ this.fetchCreateUser.bind(this) }>Create Account</Text>
                </TouchableHighlight>
                <Text>{this.state.errorMessage}</Text>

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
    } as ReactNative.ViewStyle,
    textInput: {
        marginBottom: 5,
        padding: 10,
        height: 40,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 2,
    } as ReactNative.TextStyle,
    submitButton: {
        marginBottom: 10,
        marginTop: 5,
        fontSize: 20,
    } as ReactNative.ViewStyle,
});
