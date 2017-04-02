import React from 'react';
import { View, Text } from 'react-native';

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

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.user.loggedIn) {
            storage.getUserLogin().then((state) => {
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

    componentWillReceiveProps(nextProps: any) {
        console.log(nextProps);
    }

    componentWillUnmount() {
        fcm.removeListeners();
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Text>This is a test!</Text>
                <Text>test 123</Text>
                <Text>This is a test!</Text>
                <Text>This is a test!</Text>
                <Text>This is a test!</Text>
                <Text>This is a test!</Text>
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
