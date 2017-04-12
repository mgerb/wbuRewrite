import React from 'react';
import { StyleSheet, View, ViewStyle, Text, TextStyle, TextInput } from 'react-native';
import groupAPI from '../api/group.api';
import { GroupType } from '../redux/reducers/group';
import GroupActions from '../redux/actions/group';
import store from '../redux/store';

import colors from '../style/colors';
import sizes from '../style/sizes';

interface Props {
    selectedGroup: GroupType,
}

interface State {
    message: string,
}

export default class ChatInput  extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            message: "",
        };
    }

    private fetchStoreMessage() {
        if (this.state.message === "") {
            return;
        }

        groupAPI.storeMessage(this.props.selectedGroup.id, this.state.message).then(() => {
            // get messages from server after sending
            store.dispatch(GroupActions.getGroupMessagesFetchRequested());
        }).catch(() => {

        });

        this.setState({
            message: "",
        });

    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder="Message"
                            placeholderTextColor={colors.dark1}
                            style={styles.textInput}
                            value={this.state.message}
                            onChangeText={(message) => this.setState({message})}/>

                <View style={styles.submitButton}>
                    <Text style={styles.sendText}
                          onPress={this.fetchStoreMessage.bind(this)}>Send</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: colors.dark2,
        borderTopWidth: 1,
        borderColor: colors.dark1,
    } as ViewStyle,
    textInput: {
        flex: 1,
        padding: 10,
        height: 50,
        fontSize: sizes.default,
        color: colors.white,
    } as TextStyle,
    submitButton: {
        height: 50,
        width: 80,
        alignItems: "center",
        justifyContent: "center",
    } as ViewStyle,
    sendText: {
        fontSize: sizes.default,
        color: colors.white,
    } as TextStyle,
});
