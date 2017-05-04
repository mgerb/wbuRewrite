import React from 'react';
import { View, ViewStyle, ScrollView, TextStyle, Text, TextInput, StyleSheet, TouchableHighlight, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import groupAPI from '../api/group.api';
import { GroupType } from '../redux/reducers/group';
import toast from '../utils/toast';

import colors from '../style/colors';
import sizes from '../style/sizes';

interface Props {
    navigator: any;
}

interface State {
    searchGroup: string;
    groupList: Array<GroupType>;
    noGroupsFound: boolean;
}

export default class GroupSearch extends React.Component<Props, State> {

    constructor() {
        super();
        this.state = {
            searchGroup: "",
            groupList: [],
            noGroupsFound: false,
        };
    }

    componentWillUnmount() {
        toast.hide();
    }

    private fetchSearchPublicGroup() {
        if (this.state.searchGroup === "") {
            return;
        }

        Keyboard.dismiss();

        this.setState({
            groupList: [],
            noGroupsFound: false,
        });

        groupAPI.searchPublicGroups(this.state.searchGroup).then((response) => {
            this.setState({
                searchGroup: "",
                groupList: response.data,
                noGroupsFound: response.data.length === 0,
            });
        }).catch(() => {
            toast.error("Error fetching groups.");
        });
    }

    private navigateGroupInfo(group: GroupType) {
        this.props.navigator.push({
            screen: 'GroupInfo',
            passProps: {group},
        });
    }

    public render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.searchContainer}>

                    <TextInput placeholder="Search Groups"
                               autoCapitalize="none"
                               style={styles.textInput}
                               value={this.state.searchGroup}
                               onChangeText={(searchGroup) => this.setState({searchGroup})}/>
                    <TouchableHighlight style={styles.submitButton} underlayColor={colors.light1} onPress={ this.fetchSearchPublicGroup.bind(this) }>
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableHighlight>
                </View>

                {this.state.noGroupsFound ?
                    <View style={styles.noGroupsFoundView}>
                        <Text style={styles.noGroupsFoundText}>No groups found.</Text>
                    </View>
                :
                    <ScrollView keyboardDismissMode={"on-drag"}>
                        {this.state.groupList.map((group: GroupType, index: number) => {
                            let bottomBorder = index === this.state.groupList.length - 1 ? {borderBottomWidth: 0} : {};
                            return (
                                <TouchableHighlight key={index}
                                                        underlayColor={colors.light1}
                                                        onPress={() => this.navigateGroupInfo(group)}>
                                    <View style={[styles.listItem, bottomBorder]}>
                                        <View>
                                            <Text style={[styles.listItemText, {fontSize: sizes.default}]}>{group.name}</Text>
                                            <Text style={[styles.listItemText, {fontSize: sizes.tiny}]}>{group.ownerEmail}</Text>
                                        </View>
                                        {group.locked ? <Icon name="lock" style={{fontSize: sizes.large, color: colors.primary}}/> : null}
                                    </View>
                                </TouchableHighlight>
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
    noGroupsFoundView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    } as ViewStyle,
    noGroupsFoundText: {
        fontSize: sizes.default,
        color: colors.primary,
    } as TextStyle,
});
