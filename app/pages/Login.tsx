import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { View, ViewStyle, Text, TextStyle, TextInput, StyleSheet, TouchableHighlight, Keyboard } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import userActions, { UserActionMapType } from '../redux/actions/user';
import { UserStateType } from '../redux/reducers/user';
import navigation from '../navigation';
import facebook from '../utils/facebook';

import colors from '../style/colors';
import sizes from '../style/sizes';
import wStyles from '../style/wStyles';

interface Props {
    navigator: any;
    userActions: UserActionMapType;
    user: UserStateType;
}

interface State {
    errorMessage: string;
    email: string;
    password: string;
}

class Login extends React.Component<Props, State> {

    static navigatorStyle = {...navigation.NavStyle};

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
        Keyboard.dismiss();
        // prevent login request if email/password are blank
        if (this.state.email === "" || this.state.password === "") {
            return;
        }

        this.props.userActions.loginFetchRequested(this.state.email, this.state.password);
    }

    private loginFacebook(): void {
        facebook.login().then((token) => {
            if (token) {
                this.props.userActions.loginFacebookFetchRequested(token);
            }
        });
    }

    private navigateCreateUser(): void {
        this.props.navigator.push({
            screen: "CreateUser",
            title: "New User",
        });
    }

    render() {
        return (
            <View style={styles.container}>

                <View>
                    {this.props.user.loginFetchFailed ? <Text style={styles.errorMessage}>Error logging in.</Text> : <Text> </Text>}
                </View>

                <TextInput placeholder="Email" autoCapitalize="none" style={wStyles.textInput} value={this.state.email} onChangeText={(email) => this.setState({email})}/>
                <View style={wStyles.divider}/>

                <TextInput placeholder="Password" secureTextEntry={true} autoCapitalize="none" style={wStyles.textInput} value={this.state.password} onChangeText={(password) => this.setState({password})}/>
                <View style={wStyles.divider}/>

                <TouchableHighlight style={wStyles.button} underlayColor={colors.light1} onPress={this.login.bind(this)}>
                    <Text style={wStyles.buttonText}>Login</Text>
                </TouchableHighlight>
                
                <TouchableHighlight style={[wStyles.button, styles.facebookButton]} underlayColor={colors.light1} onPress={this.loginFacebook.bind(this)}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={wStyles.buttonText}>Facebook</Text>
                        <Icon name="facebook-box" style={styles.icon}/>
                    </View>
                </TouchableHighlight>

                <View>
                    <Text style={styles.newUserText} onPress={this.navigateCreateUser.bind(this)}>Create User Account</Text>
                </View>

                <KeyboardSpacer/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    } as ViewStyle,
    facebookButton: {
        backgroundColor: '#3b5998',
    } as ViewStyle,
    icon: {
        color: colors.white,
        fontSize: sizes.large,
        paddingHorizontal: 10,
    } as TextStyle,
    newUserText: {
        fontSize: sizes.default,
        color: colors.primary,
        alignSelf: 'center',
    } as TextStyle,
    errorMessage: {
        fontSize: sizes.default,
        color: "red",
        alignSelf: 'center',
    } as TextStyle,
});

function mapStateToProps(state: Props): any {
    return {
        user: state.user,
    };
}

function mapDispatchToProps(dispatch: Dispatch<any>): any {
    return {
        userActions: bindActionCreators(userActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
