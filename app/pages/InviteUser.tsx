import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { View, ViewStyle, ScrollView, TextStyle, Text, TextInput, StyleSheet, TouchableHighlight, Keyboard } from 'react-native';
import userAPI from '../api/user.api';
import groupAPI from '../api/group.api';
import { UserType } from '../redux/reducers/user';
import { GroupStateType } from '../redux/reducers/group';
import toast from '../utils/toast';
import navigation, { ClosableModal } from '../navigation';

interface Props {
    navigator: any,
    group: GroupStateType,
}

interface State {
    searchUser: string,
    userList: Array<UserType>,
}

class CreateGroup extends React.Component<Props, State> implements ClosableModal {

    static navigatorStyle = {...navigation.NavStyle};

    private defaultState: State = {
        searchUser: "",
        userList: [],
    };

    constructor(props: Props) {
        super(props);
        this.state = _.clone(this.defaultState);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event: any): void {
        if (event.type == "NavBarButtonPress") {
            if (event.id == "close") {
                this.props.navigator.dismissModal();
            }
        }
    }

    private fetchSearchUserByName(): void {
        Keyboard.dismiss();
        this.setState({
            userList: [],
        });

        let searchUser = this.state.searchUser;
        
        if (searchUser !== "") {
            userAPI.searchUserByName(searchUser).then((response) => {
                this.setState({
                    searchUser: "",
                    userList: response.data,
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
            <View>
                <View style={styles.searchContainer}>

                    <TextInput placeholder="Search User"
                               autoCapitalize="none"
                               style={styles.textInput}
                               value={this.state.searchUser}
                               onChangeText={(searchUser) => this.setState({searchUser})}/>
                    <TouchableHighlight style={styles.submitButton} activeOpacity={50} underlayColor={'red'} onPress={ this.fetchSearchUserByName.bind(this) }>
                        <Text>Search</Text>
                    </TouchableHighlight>
                </View>

                <ScrollView>

                {this.state.userList.map((user: UserType, index: number) => {
                    return <Text key={index} onPress={() => {this.fetchInviteUserToGroup(user.id)}}>
                                {user.firstName + " " + user.lastName}
                            </Text>
                })}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
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

function mapStateToProps(state: Props): any {
  return {
    group: state.group,
  };
}

export default connect(mapStateToProps)(CreateGroup);
