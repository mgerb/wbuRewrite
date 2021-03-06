import _ from 'lodash';
import React from 'react';
import { Keyboard, KeyboardAvoidingView, View, ViewStyle, TextStyle, Text, TextInput, StyleSheet, Switch, TouchableHighlight } from 'react-native';

import groupAPI from '../api/group.api';
import store from '../redux/store';
import groupActions from '../redux/actions/group';

import colors from '../style/colors';
import sizes from '../style/sizes';
import wStyles from '../style/wStyles';

interface Props {
    navigator: any;
}

interface State {
    groupName: string;
    password: string;
    errorMessage: string;
    publicGroup: boolean;
}

export default class CreateGroup extends React.Component<Props, State> {

    private defaultState: State = {
        groupName: "",
        password: "",
        errorMessage: " ",
        publicGroup: false,
    };

    constructor(props: Props) {
        super(props);
        this.state = _.clone(this.defaultState);
    }


    fetchCreateGroup(): void {
        Keyboard.dismiss();
        this.setState({errorMessage: " "});
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

                    <TextInput style={wStyles.textInput}
                               placeholder="Group Name"
                               value={this.state.groupName}
                               multiline={false}
                               maxLength={20}
                               onChangeText={(groupName) => this.setState({groupName})}/>
                    
                    <View style={wStyles.divider}/>

                    <View style={styles.switch}>
                        <Text style={{color: colors.primary, fontSize: sizes.default}}>Public Group</Text>
                        <Switch onValueChange={(publicGroup) => this.setState({publicGroup})}
                                value={this.state.publicGroup} />
                    </View>
                    {this.state.publicGroup ?
                        <View>
                            <View style={wStyles.divider}/>
                            <TextInput placeholder="Password (Optional)"
                                    multiline={false}
                                    autoCapitalize="none"
                                    secureTextEntry={true}
                                    style={wStyles.textInput}
                                    value={this.state.password}
                                    onChangeText={(password) => this.setState({password})}/>
                        </View>
                    : null}

                </View>

                <TouchableHighlight style={wStyles.button} activeOpacity={50} underlayColor={colors.light1} onPress={ this.fetchCreateGroup.bind(this) }>
                    <Text style={wStyles.buttonText}>Create Group</Text>
                </TouchableHighlight>

                <View style={{alignItems: 'center'}}>
                    <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
                </View>

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
    errorMessage: {
        color: colors.primary,
        fontSize: sizes.default,
    } as TextStyle,
    switch: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 20,
    } as ViewStyle,
});
