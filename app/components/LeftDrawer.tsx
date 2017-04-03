import React from 'react';

// redux
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { View, Text } from 'react-native';
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
                    return <Text key={index}>{group.name}
                        {group.id === this.props.group.selectedGroup.id ? " Selected Group" : ""}
                    </Text>
                })}

                <Text onPress={this.logout.bind(this)}>Logout</Text>
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
