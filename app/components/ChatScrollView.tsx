import React from 'react';
import { View, ViewStyle, ScrollView, Text, TextStyle, StyleSheet } from 'react-native';
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

}

class ChatScrollView extends React.Component<Props, State> {

    private scrollView: any;
    
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.verticallyInverted}>
                <ScrollView contentContainerStyle={styles.scrollView}
                            ref={(scrollView: any) => {this.scrollView = scrollView}}
                            keyboardDismissMode={"on-drag"}
                            onContentSizeChange={() => this.scrollView.scrollTo({y: 0})}>

                {this.props.group.selectedGroupMessages.map((message: MessageType, index: number) => {

                    let messageStyle = {}, userNameColor = colors.cyan;
                    if (this.props.user.id === message.userID) {
                        messageStyle = {justifyContent: 'flex-end'};
                        userNameColor = colors.purple;
                    }

                    let borderStyle = this.props.group.selectedGroupMessages.length === index + 1 ? {} : {borderBottomWidth: 1};

                    return (
                        <View key={index} style={[styles.messageContainer, messageStyle, borderStyle]}>
                            <View>
                                <View style={[styles.messageHeader, messageStyle]}>
                                    <Text style={[styles.userName, {color: userNameColor}]}>{message.firstName + " " + message.lastName}</Text>
                                    <Text style={styles.timestamp}> - {time.timestamp(message.timestamp)}</Text>
                                </View>
                                <View style={styles.messageContent}>
                                    <Text style={styles.messageText}>{message.content}</Text>
                                </View>
                            </View>
                        </View>
                    );
                })}

                {this.props.group.getGroupMessagesFetchRequested ? <Text>Fetching...</Text> : null}

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
