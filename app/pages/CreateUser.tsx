import _ from 'lodash';
import React from 'react';
import { View, ViewStyle, TextStyle, KeyboardAvoidingView, Text, TextInput, StyleSheet, TouchableHighlight } from 'react-native';
import userAPI from '../api/user.api';

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
        errorMessage: " ",
    };

    constructor() {
        super();

        this.state = _.clone(this.defaultState);
    }


    fetchCreateUser(): void {
        let email = this.state.email;
        let password = this.state.password;
        let confirmPassword = this.state.confirmPassword;
        let firstName = this.state.firstName;
        let lastName = this.state.lastName;
        
        if (email === "" ||
            password === "" ||
            confirmPassword === "" ||
            firstName === "" ||
            lastName === "") {

            this.setState({
                errorMessage: "Please fill in all fields.",
            });

            return;
        }

        if (password === confirmPassword) {
            userAPI.createUser(email, password, firstName, lastName).then((response: any) => {
                alert(response.data.message);
                this.setState(this.defaultState);
            }).catch((err: any) => {
                console.log(err.response.data);
                alert(err.response.data.message);
            });
        } else {
            this.setState({
                errorMessage: "Passwords must match!",
            });
        }

        //this.props.navigator.pop({animated: true});
    }

    public render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View>
                    <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
                    <TextInput placeholder="First Name" autoCapitalize="none" style={styles.textInput} value={this.state.firstName} onChangeText={(firstName) => this.setState({firstName})}/>
                    <TextInput placeholder="Last Name" autoCapitalize="none" style={styles.textInput} value={this.state.lastName} onChangeText={(lastName) => this.setState({lastName})}/>
                    <TextInput placeholder="Email" autoCapitalize="none" style={styles.textInput} value={this.state.email} onChangeText={(email) => this.setState({email})}/>
                    <TextInput placeholder="Password" autoCapitalize="none" style={styles.textInput} value={this.state.password} onChangeText={(password) => this.setState({password})}/>
                    <TextInput placeholder="Confirm Password" autoCapitalize="none" style={styles.textInput} value={this.state.confirmPassword} onChangeText={(confirmPassword) => this.setState({confirmPassword})}/>
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
