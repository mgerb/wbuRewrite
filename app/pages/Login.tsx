import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import ReactNative, { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

import userActions from '../redux/actions/user';
import { UserStateType } from '../redux/reducers/user';

interface Props {
    navigator: any,
    userActions: any,
}

interface State {
    user: UserStateType,
}

class Login extends React.Component<Props, State> {

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight>
                    <Text onPress={() => this.props.navigator.push({screen: 'CreateUser'})}>New User</Text>
                </TouchableHighlight>
            </View>
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
        textAlign: 'center',
        paddingRight: 10,
        paddingLeft: 10,
        marginRight: 40,
        marginLeft: 40,
        marginBottom: 5,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 2,
    } as ReactNative.TextStyle,
    loginButton: {
        marginBottom: 10,
        marginTop: 5,
        fontSize: 20,
    } as ReactNative.ViewStyle,
});

function mapStateToProps(state: State): any {
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
