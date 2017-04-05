import React from 'react';
import { View, Text } from 'react-native';

// redux
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { UserStateType } from '../redux/reducers/user';
import { GroupStateType, GroupType } from '../redux/reducers/group';

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

    }

    // reset states upon logout
    private logout() {
        this.props.userActions.logout();
    }

    private setSelectedGroup(group: GroupType) {
        this.props.groupActions.setSelectedGroup(group);
    }

    private navigateGroupInvites() {
        this.props.navigator.showModal({
            screen: "GroupInvites",
            navigatorStyle: {
                navBarHidden: true,
            },
        })
    }

    private navigateGroupSegue() {
        this.props.navigator.showModal({
            screen: "GroupSegue",
            navigatorStyle: {
                navBarHidden: true,
            },
        })
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

                {this.props.group.groups.map((group: GroupType, index: number) => {
                    return <Text key={index} onPress={() => {this.setSelectedGroup(group);}}>{group.name}
                        {group.id === this.props.group.selectedGroup.id ? " Selected Group" : ""}
                    </Text>
                })}

                <Text onPress={this.logout.bind(this)}>Logout</Text>

                <Text onPress={this.navigateGroupInvites.bind(this)}>Group Invites</Text>

                <Text onPress={this.navigateGroupSegue.bind(this)}>Group Segue</Text>

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
