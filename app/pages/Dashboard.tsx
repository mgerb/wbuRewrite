import React from 'react';
import { StyleSheet, View, ViewStyle, Text, TextInput, TextStyle, TouchableHighlight, KeyboardAvoidingView, Keyboard } from 'react-native';
import MessageScrollView from '../components/MessageScrollView';

// redux
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { UserStateType } from '../redux/reducers/user';
import { GroupStateType } from '../redux/reducers/group';
import userActions, { UserActionMapType } from '../redux/actions/user';
import groupActions, { GroupActionMapType } from '../redux/actions/group';
import groupAPI from '../api/group.api';

import fcm from '../utils/fcm';
import navigation from '../navigation';
import storage from '../utils/storage';

interface Props {
    navigator: any,
    userActions: UserActionMapType,
    groupActions: GroupActionMapType,
    user: UserStateType,
    group: GroupStateType,
}

interface State {
    message: string,
}

class Dashboard extends React.Component<Props, State> {


    constructor(props: Props) {
        super(props);
        this.state = {
            message: "",
        };
    }

    componentDidMount() {
        if (!this.props.user.loggedIn) {
            storage.getUserState().then((state) => {
                if (!state) {
                    navigation.Login();
                } else {
                    // perform application bootstrap here
                    // log the user in with stored state
                    this.props.userActions.loginFetchSucceeded(state);

                }
            });
        }

        fcm.requestPermissions();
        fcm.getFCMToken();
        fcm.startListeners();

    }

    componentWillUnmount() {
        fcm.removeListeners();
    }

    private fetchStoreMessage() {
        if (this.state.message === "") {
            return;
        }

        groupAPI.storeMessage(this.props.group.selectedGroup.id, this.state.message).then(() => {
            // get messages from server after sending
            this.props.groupActions.getGroupMessagesFetchRequested();
            Keyboard.dismiss();
        }).catch(() => {

        });

        this.setState({
            message: "",
        });

    }

    render() {
        return (
            <View style={{flex: 1}}>
                <MessageScrollView/>
                <KeyboardAvoidingView style={{flexDirection: 'row'}} behavior="padding">
                    <TextInput placeholder="Message"
                                style={styles.textInput}
                                value={this.state.message}
                                onChangeText={(message) => this.setState({message})}/>
                    <TouchableHighlight style={styles.submitButton} onPress={this.fetchStoreMessage.bind(this)}>
                        <Text>Send</Text>
                    </TouchableHighlight>
                </KeyboardAvoidingView>
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
    userActions: bindActionCreators(userActions, dispatch),
    groupActions: bindActionCreators(groupActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
    } as ViewStyle,
    textInput: {
        flex: 1,
        padding: 10,
        height: 50,
    } as TextStyle,
    submitButton: {
        backgroundColor: "blue",
        height: 50,
        width: 80,
        alignItems: "center",
        justifyContent: "center",
    } as ViewStyle,
});
