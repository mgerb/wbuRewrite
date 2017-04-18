import React from 'react';
import { View, ViewStyle, Text, TextStyle, StyleSheet, ListView } from 'react-native';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
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
    navigator: any;
    user: UserStateType;
    group: GroupStateType;
    groupActions: GroupActionMapType;
    userActions: UserActionMapType;
}

interface State {
    messages: Array<MessageType>,
}
class ChatScrollView extends React.Component<Props, State> {

    private ds: any;
    
    constructor(props: Props) {
        super(props);
        this.state = {
            messages: [],
        };

        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => {return r1 !== r2;}});
    }

    componentDidMount() {
        const reversedMessages = this.props.group.selectedGroupMessages.reverse();
        this.setState({
            messages: reversedMessages,
        });
    }

    componentWillReceiveProps(nextProps: Props) {
        if (this.props.group.selectedGroupMessages !== nextProps.group.selectedGroupMessages) {
            const reversedMessages = nextProps.group.selectedGroupMessages.reverse();
            this.setState({
                messages: reversedMessages,
            });
        }
    }

    private insertMessage(message: MessageType): any {

        let messageStyle = {}, userNameColor = colors.cyan;
        if (this.props.user.id === message.userID) {
            messageStyle = {justifyContent: 'flex-end'};
            userNameColor = colors.purple;
        }

        return (
            <View style={[styles.messageContainer, messageStyle]}>
                <View>
                    <View style={[styles.messageHeader]}>
                        <Text style={[styles.userName, {color: userNameColor}]}>{message.firstName + " " + message.lastName}</Text>
                        <Text style={styles.timestamp}> - {time.timestamp(message.timestamp)}</Text>
                    </View>
                    <View style={styles.messageContent}>
                        <Text style={styles.messageText}>{message.content}</Text>
                    </View>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView contentContainerStyle={{paddingBottom: 10}}
                        renderScrollComponent={props => <InvertibleScrollView {...props} inverted />}
                        scrollRenderAheadDistance={20}
                        dataSource={this.ds.cloneWithRows(this.state.messages)}
                        renderRow={this.insertMessage.bind(this)}
                        enableEmptySections={true}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatScrollView);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.dark3,
    } as ViewStyle,
    messageContainer: {
        flexDirection: 'row',
        borderBottomColor: colors.dark2,
        paddingHorizontal: 10,
        paddingBottom: 10,
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
