import React from 'react';
import { View, ViewStyle, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// redux
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { UserStateType } from '../redux/reducers/user';
import { GroupStateType, GroupType } from '../redux/reducers/group';

import groupActions, { GroupActionMapType } from '../redux/actions/group';
import userActions, { UserActionMapType } from '../redux/actions/user';

import navigation from '../navigation';
import colors from '../style/colors';

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
        
        if (this.props.group.selectedGroup.id !== group.id) {
            this.props.groupActions.setSelectedGroup(group);
        }

        this.props.navigator.toggleDrawer({
            side: "left",
            animated: true,
            to: "closed",
        });
    }

    render() {
        return (
            <View style={styles.container}>
            <View style={styles.header}/>
                
            <ScrollView style={{flex:1}}>
                {this.props.group.groups.map((group: GroupType, index: number) => {
                    return <Text key={index} onPress={() => this.setSelectedGroup(group)}>{group.name}
                        {group.id === this.props.group.selectedGroup.id ? " Selected Group" : ""}
                    </Text>
                })}

                <Text onPress={this.logout.bind(this)}>Logout</Text>

                <Text onPress={() => navigation.GroupInvites()}>Group Invites</Text>

                <Text onPress={() => navigation.GroupSegue()}>Group Segue</Text>
            </ScrollView>

            <View style={styles.footer}>
                <Icon name="gear"/>
                </View>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.dark3,
    } as ViewStyle,
    header: {
        height: 50,
    } as ViewStyle,
    footer: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    } as ViewStyle,
});
