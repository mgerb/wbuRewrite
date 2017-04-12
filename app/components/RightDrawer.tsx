import React from 'react';
import { View, Text } from 'react-native';

// redux
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { UserType, UserStateType } from '../redux/reducers/user';
import { GroupStateType } from '../redux/reducers/group';
import groupActions, { GroupActionMapType } from '../redux/actions/group';
import userActions, { UserActionMapType } from '../redux/actions/user';

import navigation from '../navigation';

interface Props {
    navigator: any,
    user: UserStateType,
    group: GroupStateType,
    groupActions: GroupActionMapType,
    userActions: UserActionMapType,
}

interface State {

}

class RightDrawer extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Text>This is a test!</Text>
                <Text>This is a test!</Text>
                <Text>This is a test!</Text>
                <Text>This is a test!</Text>
                <Text>This is a test!</Text>

                {this.props.group.selectedGroupUsers.map((user: UserType, index: number) => {
                    return (
                        <View key={index}>
                            <Text>{user.firstName + " " + user.lastName}</Text>
                            { user.id === this.props.group.selectedGroup.ownerID ?
                            <Text>Group Owner</Text>: null}
                        </View>
                    );
                })}

                {this.props.user.id === this.props.group.selectedGroup.ownerID ? 
                    <Text onPress={() => navigation.InviteUser()}>Invite User</Text>
                : null}

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

export default connect(mapStateToProps, mapDispatchToProps)(RightDrawer);
