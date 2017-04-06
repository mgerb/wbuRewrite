import React from 'react';
import { View, KeyboardAvoidingView, ViewStyle, Text, TextStyle, StyleSheet, TextInput, TouchableHighlight, Keyboard} from 'react-native';
import groupAPI from '../api/group.api';
import store from '../redux/store';
import { GroupType } from '../redux/reducers/group';
import groupActions from '../redux/actions/group';
import toast from '../utils/toast';

interface Props {
    navigator: any,
    group: GroupType,
}

interface State {
    password: string,
}

export default class GroupInfo extends React.Component<Props, State> {

    constructor() {
        super();

        this.state = {
            password: "",
        };
    }

    fetchJoinGroup() {
        Keyboard.dismiss();
        
        this.setState({
            password: "",
        });

        groupAPI.joinPublicGroup(this.props.group.id, this.state.password).then(() => {
            // refresh user groups after group creation
            store.dispatch(groupActions.getUserGroupsFetchRequested());

            toast.success("Group joined!");
        }).catch(() => {
            toast.error("Failed to join group.");
        });
    }

    public render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View>
                    <Text>{this.props.group.name}</Text>
                    <Text>{this.props.group.ownerEmail}</Text>
                    <Text>{this.props.group.userCount}</Text>
                    {this.props.group.locked ? 
                        <TextInput placeholder="Password" autoCapitalize="none" style={styles.textInput} value={this.state.password} onChangeText={(password) => this.setState({password})}/>
                    : null}
                    <TouchableHighlight onPress={this.fetchJoinGroup.bind(this)}>
                        <Text>Join Group</Text>
                    </TouchableHighlight>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
});
