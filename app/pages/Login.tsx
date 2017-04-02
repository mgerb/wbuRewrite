import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { View, ViewStyle, Text, TextStyle, TextInput, KeyboardAvoidingView, StyleSheet, TouchableHighlight } from 'react-native';

import userActions, { UserActionMapType } from '../redux/actions/user';
import { UserStateType } from '../redux/reducers/user';
import navigation from '../navigation';
import facebook from '../utils/facebook';

interface Props {
    navigator: any,
    userActions: UserActionMapType,
    user: UserStateType,
}

interface State {
    errorMessage: string,
    email: string,
    password: string,
}

class Login extends React.Component<Props, State> {

    private defaultState: State = {
        email: "",
        password: "",
        errorMessage: " ",
    };

    constructor(props: Props) {
        super(props);

        this.state = this.defaultState;
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.user.loggedIn) {
            navigation.Dashboard();
        }
    }

    private login(): void {
        this.props.userActions.loginFetchRequested(this.state.email, this.state.password);
    }

    private loginFacebook(): void {
        facebook.login().then((token) => {
            this.props.userActions.loginFacebookFetchRequested(token);
        });
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View>
                    {this.props.user.loginFetchFailed ? <Text style={styles.errorMessage}>Login failed.</Text> : <Text> </Text>}
                    <TextInput placeholder="Email" autoCapitalize="none" style={styles.textInput} value={this.state.email} onChangeText={(email) => this.setState({email})}/>
                    <TextInput placeholder="Password" autoCapitalize="none" style={styles.textInput} value={this.state.password} onChangeText={(password) => this.setState({password})}/>
                </View>

                <TouchableHighlight style={styles.submitButton} activeOpacity={50} underlayColor={'red'} onPress={this.login.bind(this)}>
                    <Text>Login</Text>
                </TouchableHighlight>
                
                <TouchableHighlight style={styles.submitButton} activeOpacity={50} underlayColor={'red'} onPress={this.loginFacebook.bind(this)}>
                    <Text>Login Facebook</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.submitButton} activeOpacity={50} underlayColor={'red'}
                                        onPress={() => {this.props.navigator.push({screen: 'CreateUser'})}}>
                    <Text>New User</Text>
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

function mapStateToProps(state: Props): any {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch: Dispatch<any>): any {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
