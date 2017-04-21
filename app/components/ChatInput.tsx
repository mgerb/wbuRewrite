import React from 'react';
import { StyleSheet, View, ViewStyle, Text, TextStyle, TextInput } from 'react-native';
import groupAPI from '../api/group.api';
import { GroupType } from '../redux/reducers/group';
import GroupActions from '../redux/actions/group';
import store from '../redux/store';

import colors from '../style/colors';
import sizes from '../style/sizes';

interface Props {
    selectedGroup: GroupType;
}

interface State {
    message: string;
    textInputContainerHeight: number;
}

export default class ChatInput  extends React.Component<Props, State> {


    constructor(props: Props) {
        super(props);
        this.state = {
            message: "",
            textInputContainerHeight: 40,
        };
    }

    private fetchStoreMessage() {
        if (this.state.message === "") {
            return;
        }
        groupAPI.storeMessage(this.props.selectedGroup.id, this.state.message).then(() => {
            // get messages from server after sending
            store.dispatch(GroupActions.getGroupMessagesFetchRequested(this.props.selectedGroup.id));
        }).catch(() => {

        });

        this.setState({
            message: "",
        });
    }

    onTextInputSizeChange(e: any) {
        const height = e.nativeEvent.contentSize.height;

        if (height > 40 && height < 200) {
            this.setState({
                textInputContainerHeight: height,
            });
        } else if (height < 40) {
            this.setState({
                textInputContainerHeight: 40,
            });
        }
    }

    render() {
        return (
            <View style={[styles.container, {height: this.state.textInputContainerHeight}]}>
                <TextInput placeholder="Message"
                            multiline={true}
                            placeholderTextColor={colors.dark1}
                            style={styles.textInput}
                            value={this.state.message}
                            keyboardAppearance={'dark'}
                            maxLength={150}
                            onContentSizeChange={(e) => {this.onTextInputSizeChange(e);}}
                            onChangeText={(message) => this.setState({message})}/>

                <Text style={styles.sendText}
                        onPress={this.fetchStoreMessage.bind(this)}>Send</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: colors.dark2,
        borderTopWidth: 1,
        borderColor: colors.dark1,
        paddingHorizontal: 10,
    } as ViewStyle,
    textInput: {
        flex: 1,
        fontSize: sizes.default,
        color: colors.white,
    } as TextStyle,
    sendText: {
        paddingTop: 6,
        fontSize: sizes.default,
        color: colors.white,
    } as TextStyle,
});
