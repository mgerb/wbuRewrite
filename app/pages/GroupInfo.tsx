import React from 'react';
import { View, ViewStyle, Text, StyleSheet, TextInput, TouchableHighlight, Keyboard} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import groupAPI from '../api/group.api';
import store from '../redux/store';
import { GroupType } from '../redux/reducers/group';
import groupActions from '../redux/actions/group';
import toast from '../utils/toast';

import colors from '../style/colors';
import sizes from '../style/sizes';
import wStyles from '../style/wStyles';

interface Props {
    navigator: any;
    group: GroupType;
}

interface State {
    password: string;
}

export default class GroupInfo extends React.Component<Props, State> {

    constructor() {
        super();

        this.state = {
            password: "",
        };
    }

    componentWillUnmount() {
        toast.hide();
    }

    fetchJoinGroup() {
        Keyboard.dismiss();

        if (this.props.group.locked && this.state.password === "") {
            return;
        }
        
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
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <Text style={{fontSize: sizes.large, color: colors.primary, marginBottom: 5}}>{this.props.group.name}</Text>
                    <Text style={{fontSize: sizes.small, color: colors.primary}}>{this.props.group.ownerName}</Text>
                    <Text style={{fontSize: sizes.small, color: colors.primary}}>{this.props.group.ownerEmail}</Text>
                    <Text style={{fontSize: sizes.small, color: colors.primary}}>{this.props.group.userCount} {this.props.group.userCount as number > 1 ? 'users' : 'user'}</Text>
                </View>

                {this.props.group.locked ? 
                    <TextInput placeholder="Password" secureTextEntry={true} autoCapitalize="none" style={wStyles.textInput} value={this.state.password} onChangeText={(password) => this.setState({password})}/>
                : null}
                <TouchableHighlight style={wStyles.button} underlayColor={colors.primary} onPress={this.fetchJoinGroup.bind(this)}>
                    <Text style={wStyles.buttonText}>Join Group</Text>
                </TouchableHighlight>
                <KeyboardSpacer/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
    } as ViewStyle,
    infoContainer: {
        paddingVertical: 50,
        alignItems: 'center',
    } as ViewStyle,
});
