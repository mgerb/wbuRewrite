import _ from 'lodash';
import React from 'react';
import { KeyboardAvoidingView, View, ViewStyle, TextStyle, Text, TextInput, StyleSheet, TouchableHighlight } from 'react-native';

import userAPI from '../api/user.api';

import colors from '../style/colors';
import sizes from '../style/sizes';
import wStyles from '../style/wStyles';

interface Props {
    navigator: any;
}

interface State {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    responseMessage: string;
}

export default class CreateUser extends React.Component<Props, State> {

    private defaultState: State = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        responseMessage: " ",
    };

    constructor(props: Props) {
        super(props);

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
                responseMessage: "Please fill in all fields.",
            });

            return;
        }

        if (password === confirmPassword) {
            userAPI.createUser(email, password, firstName, lastName).then(() => {
                this.setState({...this.defaultState, responseMessage: "Account created!"});
            }).catch((error: any) => {
                this.setState({responseMessage: error.response.data.message});
            });
        } else {
            this.setState({
                responseMessage: "Passwords must match!",
            });
        }
    }

    public render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>

                <View>
                    <Text style={styles.responseMessage}>{this.state.responseMessage}</Text>
                </View>

                <View>
                    <TextInput placeholder="First Name" multiline={false} style={wStyles.textInput} value={this.state.firstName} onChangeText={(firstName) => this.setState({firstName})}/>
                    <View style={wStyles.divider}/>

                    <TextInput placeholder="Last Name" multiline={false} style={wStyles.textInput} value={this.state.lastName} onChangeText={(lastName) => this.setState({lastName})}/>
                    <View style={wStyles.divider}/>

                    <TextInput placeholder="Email" multiline={false} autoCapitalize="none" style={wStyles.textInput} value={this.state.email} onChangeText={(email) => this.setState({email})}/>
                    <View style={wStyles.divider}/>

                    <TextInput placeholder="Password" multiline={false} secureTextEntry={true} autoCapitalize="none" style={wStyles.textInput} value={this.state.password} onChangeText={(password) => this.setState({password})}/>
                    <View style={wStyles.divider}/>

                    <TextInput placeholder="Confirm Password" multiline={false} secureTextEntry={true} autoCapitalize="none" style={wStyles.textInput} value={this.state.confirmPassword} onChangeText={(confirmPassword) => this.setState({confirmPassword})}/>
                    <View style={wStyles.divider}/>
                </View>

                <TouchableHighlight style={wStyles.button} underlayColor={colors.light1} onPress={ this.fetchCreateUser.bind(this) }>
                    <Text style={wStyles.buttonText}>Create Account</Text>
                </TouchableHighlight>

            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    } as ViewStyle,
    responseMessage: {
        color: colors.primary,
        alignSelf: "center",
        fontSize: sizes.default,
        textAlign: 'center',
    } as TextStyle,
});
