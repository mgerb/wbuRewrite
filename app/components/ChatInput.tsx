import React from 'react';
import { StyleSheet, View, ViewStyle, Text, TextStyle, TextInput } from 'react-native';
import moment from 'moment';
import _ from 'lodash';

import groupAPI from '../api/group.api';

// redux
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { UserStateType } from '../redux/reducers/user';
import { GroupStateType, MessageType } from '../redux/reducers/group';
import groupActions, { GroupActionMapType } from '../redux/actions/group';
import userActions, { UserActionMapType } from '../redux/actions/user';

import colors from '../style/colors';
import sizes from '../style/sizes';

interface Props {
    navigator: any;
    user: UserStateType;
    group: GroupStateType;
    groupActions: GroupActionMapType;
    userActions: UserActionMapType;
}

interface State {
    message: string;
    textInputContainerHeight: number;
}

class ChatInput  extends React.Component<Props, State> {

    private throttledStoreMessage: any;

    constructor(props: Props) {
        super(props);
        this.state = {
            message: "",
            textInputContainerHeight: 40,
        };

        this.throttledStoreMessage = _.throttle(this.storeMessage, 2000);
    }

    private fetchStoreMessage() {
        if (this.state.message === "") {
            return;
        }

        let newMessageText = this.state.message.trim();

        let message: MessageType = {
            id: 0,
            groupID: 0,
            userID: this.props.user.id as number,
            firstName: this.props.user.firstName as string,
            lastName: this.props.user.lastName as string,
            content: newMessageText,
            timestamp: moment().unix() - 10,
        };

        // immediately add new message to state so it shows up right away before loading from server
        this.props.groupActions.setGroupMessages([message, ...this.props.group.selectedGroupMessages]);

        this.throttledStoreMessage(this.props.group.selectedGroup.id, newMessageText);

        this.setState({
            message: "",
        });
    }

    storeMessage(id: number, message: string) {
        groupAPI.storeMessage(id, message).then(() => {
            // get messages from server after sending
            // don't need this anymore - messages are updated from FCM now to this fetch is unnecessary
            //this.props.groupActions.getGroupMessagesFetchRequested(this.props.group.selectedGroup.id);
        }).catch(() => {
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


function mapStateToProps(state: Props): any {
  return {
    user: state.user,
    group: state.group,
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>): any {
  return {
    groupActions: bindActionCreators(groupActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatInput);

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
