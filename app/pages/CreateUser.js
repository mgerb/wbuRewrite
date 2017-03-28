// @flow

import _ from 'lodash';
import React from 'react';
import { View, KeyboardAvoidingView, Text, TextInput, StyleSheet, TouchableHighlight } from 'react-native';

export default class CreateUser extends React.Component {

    defaultState: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        confirmPassword: string;
    }

    state: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        confirmPassword: string;
        errorMessage: string,
    }

    constructor() {
        super();
        this.defaultState = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        };

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
                    <TextInput placeholder="Password" autoCapitalize="none" style={styles.textInput} value={this.state.password} type="password" onChangeText={(password) => this.setState({password})}/>
                    <TextInput placeholder="Confirm Password" autoCapitalize="none" style={styles.textInput} value={this.state.confirmPassword} type="password" onChangeText={(confirmPassword) => this.setState({confirmPassword})}/>
                </View>

                <TouchableHighlight>
                    <Text style={styles.submitButton} onPress={ this.fetchCreateUser.bind(this) }>Create Account</Text>
                </TouchableHighlight>
                <Text>{this.state.errorMessage}</Text>

                <View style={styles.test}/>
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
    },
    textInput: {
        marginBottom: 5,
        padding: 10,
        height: 40,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 2,
    },
    submitButton: {
        marginBottom: 10,
        marginTop: 5,
        fontSize: 20,
    },
});
