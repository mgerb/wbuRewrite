import _ from 'lodash';
import React from 'react';
import { View, ViewStyle, TextStyle, KeyboardAvoidingView, Text, TextInput, StyleSheet, Switch, TouchableHighlight } from 'react-native';
import groupAPI from '../api/group.api';
import store from '../redux/store';
import groupActions from '../redux/actions/group';

interface Props {
    navigator: any,
}

interface State {
    groupName: string;
    password: string;
    errorMessage: string,
    publicGroup: boolean,
}

export default class CreateGroup extends React.Component<Props, State> {

    private defaultState: State = {
        groupName: "",
        password: "",
        errorMessage: "",
        publicGroup: false,
    };

    constructor() {
        super();
        this.state = _.clone(this.defaultState);
    }


    fetchCreateGroup(): void {
        this.setState({errorMessage: ""});
        let password = this.state.password;
        let groupName = this.state.groupName;
        let publicGroup = this.state.publicGroup;
        
        if (groupName === "") {
            this.setState({
                errorMessage: "Please enter a group name.",
            });
        } else {
            groupAPI.createGroup(groupName, password, publicGroup).then(() => {
                this.setState(this.defaultState);
                this.setState({errorMessage: "Group created!"});
                
                // refresh user groups after group creation
                store.dispatch(groupActions.getUserGroupsFetchRequested());
            }).catch(() => {
                this.setState(this.defaultState);
                this.setState({errorMessage: "Failed to create group."});
            });
        }

    }

    public render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View>
                    <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>

                    <TextInput placeholder="Group Name"
                               autoCapitalize="none"
                               style={styles.textInput}
                               value={this.state.groupName}
                                maxLength={20}
                               onChangeText={(groupName) => this.setState({groupName})}/>
                    <View style={styles.switch}>
                        <Text>Public Group</Text>
                        <Switch onValueChange={(publicGroup) => this.setState({publicGroup})}
                                value={this.state.publicGroup} />
                    </View>
                    {this.state.publicGroup ?
                        <View>
                        <Text>Password</Text>
                        <TextInput placeholder="Optional"
                                autoCapitalize="none"
                                style={styles.textInput}
                                value={this.state.password}
                                onChangeText={(password) => this.setState({password})}/>
                        </View>
                    : null}

                </View>

                <TouchableHighlight style={styles.submitButton} activeOpacity={50} underlayColor={'red'} onPress={ this.fetchCreateGroup.bind(this) }>
                    <Text>Create Group</Text>
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
    switch: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 5,
        marginBottom: 5,
    } as ViewStyle,
});
