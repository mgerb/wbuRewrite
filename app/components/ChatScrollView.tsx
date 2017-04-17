import React from 'react';
import { View, ViewStyle, ScrollView, Text, TextStyle, StyleSheet, NativeScrollEvent } from 'react-native';
import time from '../utils/time';

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
    navigator: any,
    user: UserStateType,
    group: GroupStateType,
    groupActions: GroupActionMapType,
    userActions: UserActionMapType,
}

interface State {
    lastMessageIndex: number,
}

const pagingIndex = 11;

class ChatScrollView extends React.Component<Props, State> {

    private scrollView: any;
    
    constructor(props: Props) {
        super(props);
        this.state = {
            lastMessageIndex: pagingIndex,
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        if (this.props.group.selectedGroupMessages !== nextProps.group.selectedGroupMessages) {

            // if completely new group we need to reset last message index
            if (this.props.group.selectedGroup !== nextProps.group.selectedGroup) {
                this.setState({
                    lastMessageIndex: pagingIndex,
                });
            }
        }
    }

    private insertMessages(): any {
        let messageList: Array<any> = [];
        let messages = this.props.group.selectedGroupMessages;

        // return if no messages exist
        if (messages.length < 1) {
            return;
        }

        let startingIndex = messages.length < this.state.lastMessageIndex ? 0 : messages.length - this.state.lastMessageIndex;
        
        for (let i = startingIndex; i < messages.length; i++) {
            let messageStyle = {}, userNameColor = colors.cyan;
            if (this.props.user.id === messages[i].userID) {
                messageStyle = {justifyContent: 'flex-end'};
                userNameColor = colors.purple;
            }

            let borderStyle = this.props.group.selectedGroupMessages.length === i + 1 ? {} : {borderBottomWidth: 1};

            messageList.push(
                <View key={i} style={[styles.messageContainer, messageStyle, borderStyle]}>
                    <View>
                        <View style={[styles.messageHeader, messageStyle]}>
                            <Text style={[styles.userName, {color: userNameColor}]}>{messages[i].firstName + " " + messages[i].lastName}</Text>
                            <Text style={styles.timestamp}> - {time.timestamp(messages[i].timestamp)}</Text>
                        </View>
                        <View style={styles.messageContent}>
                            <Text style={styles.messageText}>{messages[i].content}</Text>
                        </View>
                    </View>
                </View>
            );
        }

        return messageList;
    }

    render() {
        return (
            <View style={styles.verticallyInverted}>
                <ScrollView contentContainerStyle={styles.scrollView}
                            ref={(scrollView: any) => {this.scrollView = scrollView;}}
                            keyboardDismissMode={"on-drag"}
                            scrollEventThrottle={500}
                            onContentSizeChange={() => this.scrollView.scrollTo({y: 0})}>

                {this.insertMessages()}
                {this.props.group.getGroupMessagesFetchRequested  ? <Text>Fetching...</Text> : null}

                </ScrollView>
            </View>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatScrollView);

const styles = StyleSheet.create({
    verticallyInverted: {
        flex: 1,
        backgroundColor: colors.dark3,
        transform: [
            { scaleY: -1 },
        ],
    } as ViewStyle,
    scrollView: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingHorizontal: 5,
        paddingBottom: 10,
        transform: [
            { scaleY: -1 },
        ],
    } as ViewStyle,
    messageContainer: {
        flexDirection: 'row',
        borderBottomColor: colors.dark2,
        padding: 10,
    } as ViewStyle,
    messageHeader: {
        paddingHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'center',
    } as ViewStyle,
    messageContent: {
        backgroundColor: colors.dark2,
        borderWidth: 1,
        borderColor: colors.dark1,
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
    } as ViewStyle,
    messageText: {
        fontSize: sizes.default,
        color: colors.white,
    } as TextStyle,
    userName: {
        fontSize: sizes.small,
    } as TextStyle,
    timestamp: {
        fontSize: sizes.tiny,
        color: colors.dark1,
    } as TextStyle,
});
