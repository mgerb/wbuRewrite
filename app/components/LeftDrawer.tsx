import React from 'react';

// redux
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { View, Text } from 'react-native';
import { UserStateType } from '../redux/reducers/user';
import { GroupStateType } from '../redux/reducers/group';

import groupActions, { GroupActionMapType } from '../redux/actions/group';
import userActions, { UserActionMapType } from '../redux/actions/user';

interface Props {
    user:  UserStateType,
    group: GroupStateType,
    groupActions: GroupActionMapType,
    userActions: UserActionMapType,
    navigator: any,
}

interface State {

}

class LeftDrawer extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        console.log(props);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Text>This is a test!</Text>
                <Text>This is a test!</Text>
                <Text>This is a test!</Text>
                <Text>This is a test!</Text>
                <Text>This is a test!</Text>
                <Text>.....</Text>
                <Text>.....</Text>
                <Text>.....</Text>
                <Text>.....</Text>
                <Text>.....</Text>
                <Text>.....</Text>
                <Text>.....</Text>
                <Text>.....</Text>
                <Text>.....</Text>

                <Text onPress={this.props.userActions.logout.bind(this)}>Logout</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(LeftDrawer);
