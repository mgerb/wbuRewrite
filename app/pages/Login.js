// @flow

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

import * as userActions from '../redux/actions/user';

class Login extends React.Component {

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
    },
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
    },
    loginButton: {
        marginBottom: 10,
        marginTop: 5,
        fontSize: 20,
    },
});

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
