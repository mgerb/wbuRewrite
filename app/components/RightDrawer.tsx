import React from 'react';
import { Alert, View, ViewStyle, ScrollView, Text, TextStyle, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// redux
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { UserType, UserStateType } from '../redux/reducers/user';
import { GroupStateType } from '../redux/reducers/group';
import groupActions, { GroupActionMapType } from '../redux/actions/group';
import userActions, { UserActionMapType } from '../redux/actions/user';
import groupAPI from '../api/group.api';

import navigation from '../navigation';

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

}

class RightDrawer extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    private insertIcon(user: UserType): any {
        if (user.id === this.props.group.selectedGroup.ownerID) {
            return <Icon name="crown" style={[styles.itemIcon, {color: colors.yellow}]}/>;
        }

        if (this.props.user.id === this.props.group.selectedGroup.ownerID) {
            return <Icon name="minus-circle-outline"
                            style={[styles.itemIcon, {color: colors.red}]}
                            onPress={() => this.removeUserOnPress(user)}/>;
        }

        return null;
    }

    private removeUserOnPress(user: UserType) {
        Alert.alert(
            'Remove User',
            `Are you sure you want to remove ${user.firstName} ${user.lastName} from this group?`,
            [
                {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Yes', onPress: () => this.fetchRemoveUser(user.id, this.props.group.selectedGroup.id)},
            ],
                { cancelable: false },
        );
    }

    private fetchRemoveUser(userID?: number, groupID?: number): void {
        groupAPI.removeUserFromGroup(userID as number, groupID as number).then(() => {
            this.props.groupActions.getGroupUsersFetchRequested();
        });
    }

    private logoutOnPress() {
        Alert.alert(
            'Leave Group',
            `Are you sure you want to leave this group?`,
            [
                {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Yes', onPress: () => this.fetchLeaveGroup()},
            ],
            {
                cancelable: false,
            },
        );
    }

    private fetchLeaveGroup() {
        groupAPI.leaveGroup(this.props.group.selectedGroup.id as number).then(() => {
            this.props.groupActions.resetGroupState();
            this.props.groupActions.getUserGroupsFetchRequested();
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Group Users</Text>
                </View>

                <ScrollView>
                    {this.props.group.selectedGroupUsers.map((user: UserType, index: number) => {
                        return (
                            <View key={index} style={styles.itemContainer}>
                                <View style={{flex:1}}>
                                    <Text numberOfLines={1} style={styles.itemText}>{user.firstName + " " + user.lastName}</Text>
                                </View>
                                {this.insertIcon(user)}
                            </View>
                        );
                    })}
                </ScrollView>

                {this.props.group.selectedGroup.id ?
                    <View style={styles.footer}>
                        {this.props.user.id === this.props.group.selectedGroup.ownerID ? 
                        <Icon name="account-plus" style={styles.icon} onPress={() => navigation.InviteUser()}/> :
                        <Icon name="logout" style={styles.icon} onPress={this.logoutOnPress.bind(this)}/>}
                    </View>
                : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(RightDrawer);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.dark3,
    } as ViewStyle,
    header: {
        height: 50,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 5,
        backgroundColor: colors.primary,
    } as ViewStyle,
    headerText: {
        color: colors.white,
        fontSize: sizes.default,
    } as TextStyle,
    footer: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: colors.dark2,
    } as ViewStyle,
    itemContainer: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
    } as ViewStyle,
    itemContainerSelected: {
        backgroundColor: colors.dark2,
        borderLeftWidth: 5,
        borderLeftColor: colors.primary,
    } as ViewStyle,
    itemText: {
        color: colors.white,
        fontSize: sizes.default,
    } as TextStyle,
    itemIcon: {
        fontSize: sizes.large,
    } as TextStyle,
    icon: {
        fontSize: sizes.large,
        color: colors.white,
    } as TextStyle,
});
