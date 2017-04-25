import _ from 'lodash';
import React from 'react';
import { View, ViewStyle, TextStyle, Text, TextInput, StyleSheet, TouchableHighlight } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import userAPI from '../api/user.api';
import toast from '../utils/toast';

import colors from '../style/colors';
//import sizes from '../style/sizes';
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
    errorMessage: string;
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
                errorMessage: "Please fill in all fields.",
            });

            return;
        }

        if (password === confirmPassword) {
            userAPI.createUser(email, password, firstName, lastName).then((response: any) => {
                toast.success(response.data.message);
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
    }

    public render() {
        return (
            <View style={styles.container}>

                <View>
                    <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
                </View>

                <View>
                    <TextInput placeholder="First Name" multiline={false} autoCapitalize="none" style={wStyles.textInput} value={this.state.firstName} onChangeText={(firstName) => this.setState({firstName})}/>
                    <View style={wStyles.divider}/>

                    <TextInput placeholder="Last Name" multiline={false} autoCapitalize="none" style={wStyles.textInput} value={this.state.lastName} onChangeText={(lastName) => this.setState({lastName})}/>
                    <View style={wStyles.divider}/>

                    <TextInput placeholder="Email" multiline={false} autoCapitalize="none" style={wStyles.textInput} value={this.state.email} onChangeText={(email) => this.setState({email})}/>
                    <View style={wStyles.divider}/>

                    <TextInput placeholder="Password" multiline={false} autoCapitalize="none" style={wStyles.textInput} value={this.state.password} onChangeText={(password) => this.setState({password})}/>
                    <View style={wStyles.divider}/>

                    <TextInput placeholder="Confirm Password" multiline={false} autoCapitalize="none" style={wStyles.textInput} value={this.state.confirmPassword} onChangeText={(confirmPassword) => this.setState({confirmPassword})}/>
                    <View style={wStyles.divider}/>
                </View>

                <TouchableHighlight style={wStyles.button} underlayColor={colors.light1} onPress={ this.fetchCreateUser.bind(this) }>
                    <Text style={wStyles.buttonText}>Create Account</Text>
                </TouchableHighlight>

                <KeyboardSpacer/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    } as ViewStyle,
    errorMessage: {
        color: "red",
    } as TextStyle,
});
