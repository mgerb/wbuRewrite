import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import ChatScrollView from '../components/ChatScrollView';
import ChatInput from '../components/ChatInput';

// redux
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { UserStateType } from '../redux/reducers/user';
import { GroupStateType } from '../redux/reducers/group';
import userActions, { UserActionMapType } from '../redux/actions/user';
import groupActions, { GroupActionMapType } from '../redux/actions/group';

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

}

class Dashboard extends React.Component<Props, State> {

    static navigatorStyle = {...navigation.NavStyle};
    
    constructor(props: Props) {
        super(props);
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


    render() {
        return (
            <View style={styles.container}>
                <ChatScrollView/>
                <ChatInput selectedGroup={{...this.props.group.selectedGroup}}/>
                <KeyboardSpacer/>
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
    } as ViewStyle,
});
