import React from 'react';
import { connect } from 'react-redux';
import { View, ViewStyle, ScrollView, TextStyle, Text, TextInput, StyleSheet, TouchableHighlight, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import userAPI from '../api/user.api';
import groupAPI from '../api/group.api';
import { UserType } from '../redux/reducers/user';
import { GroupStateType } from '../redux/reducers/group';
import toast from '../utils/toast';
import navigation, { ClosableModal } from '../navigation';

import colors from '../style/colors';
import sizes from '../style/sizes';

interface Props {
    navigator: any;
    group: GroupStateType;
}

interface State {
    searchUser: string;
    userList: Array<UserType>;
    noUsersFound: boolean;
}

class CreateGroup extends React.Component<Props, State> implements ClosableModal {

    static navigatorStyle = {...navigation.NavStyle};

    constructor(props: Props) {
        super(props);
        this.state = {
            searchUser: "",
            userList: [],
            noUsersFound: false,
        };

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event: any): void {
        if (event.type === "NavBarButtonPress" && event.id === "close") {
            this.props.navigator.dismissModal();
        }
    }

    private fetchSearchUserByName(): void {
        if (this.state.searchUser === "") {
            return;
        }

        Keyboard.dismiss();

        this.setState({
            userList: [],
            noUsersFound: false,
        });

        let searchUser = this.state.searchUser;
        
        if (searchUser !== "") {
            userAPI.searchUserByName(searchUser).then((response) => {
                this.setState({
                    searchUser: "",
                    userList: response.data,
                    noUsersFound: response.data.length === 0,
                });
            });
        }
    }

    private fetchInviteUserToGroup(userID?: number): void {
        groupAPI.inviteUserToGroup(userID, this.props.group.selectedGroup.id).then(() => {
            toast.success("User invited!");
        }).catch(() => {
            toast.error("Error inviting user.");
        });
    }

    public render() {
        return (
            <View style={{flex:1}}>
                <View style={styles.searchContainer}>

                    <TextInput placeholder="Search User"
                               autoCapitalize="none"
                               style={styles.textInput}
                               value={this.state.searchUser}
                               onChangeText={(searchUser) => this.setState({searchUser})}/>
                    <TouchableHighlight style={styles.submitButton} underlayColor={colors.light1} onPress={ this.fetchSearchUserByName.bind(this) }>
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableHighlight>
                </View>

                {this.state.noUsersFound ?
                    <View style={styles.noUsersFoundView}>
                        <Text style={styles.noUsersFoundText}>No users found.</Text>
                    </View>
                :
                    <ScrollView>
                        {this.state.userList.map((user: UserType, index: number) => {
                            let bottomBorder = index === this.state.userList.length - 1 ? {borderBottomWidth: 0} : {};
                            return (
                                <View key={index} style={[styles.listItem, bottomBorder]}>
                                    <Text style={[styles.listItemText, {fontSize: sizes.default}]}>
                                        {user.firstName + " " + user.lastName}
                                    </Text>
                                    <Icon name="plus"
                                            style={{fontSize: sizes.large, color: colors.primary}}
                                            onPress={() => {this.fetchInviteUserToGroup(user.id);}}/>
                                </View>
                            );
                        })}
                    </ScrollView>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        borderTopWidth: 2,
        borderBottomWidth: 1,
        borderColor: colors.light1,
        height: 50,
        paddingLeft: 20,
    } as ViewStyle,
    textInput: {
        flex: 1,
        height: 50,
    } as TextStyle,
    submitButton: {
        backgroundColor: colors.primary,
        width: 80,
        alignItems: "center",
        justifyContent: "center",
    } as ViewStyle,
    buttonText: {
        fontSize: sizes.default,
        color: colors.white,
    } as TextStyle,
    listItem: {
        flexDirection: 'row',
        height: 50,
        borderBottomWidth: 1,
        borderColor: colors.light1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    } as ViewStyle,
    listItemText: {
        color: colors.primary,
    } as TextStyle,
    noUsersFoundView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    } as ViewStyle,
    noUsersFoundText: {
        fontSize: sizes.default,
        color: colors.primary,
    } as TextStyle,
});


function mapStateToProps(state: Props): any {
  return {
    group: state.group,
  };
}

export default connect(mapStateToProps)(CreateGroup);
