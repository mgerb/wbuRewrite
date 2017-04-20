import _ from 'lodash';
import React from 'react';
import { View, ViewStyle, ScrollView, TextStyle, Text, TextInput, StyleSheet, TouchableHighlight, Keyboard} from 'react-native';
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
}

export default class GroupSearch extends React.Component<Props, State> {

    private defaultState: State = {
        searchGroup: "",
        groupList: [],
    };

    constructor() {
        super();
        this.state = _.clone(this.defaultState);
    }

    private fetchSearchPublicGroup() {
        if (this.state.searchGroup === "") {
            return;
        }
        Keyboard.dismiss();
        groupAPI.searchPublicGroups(this.state.searchGroup).then((response) => {
            this.setState({
                groupList: response.data,
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

                <ScrollView keyboardDismissMode={"on-drag"}>
                    {this.state.groupList.map((group: GroupType, index: number) => {
                        return (
                            <TouchableHighlight underlayColor={colors.light1} key={index} onPress={() => this.navigateGroupInfo(group)}>
                                <View style={styles.listItem}>
                                    <Text style={[styles.listItemText, {fontSize: sizes.default}]}>{group.name}</Text>
                                    <Text style={styles.listItemText}>{group.ownerEmail}</Text>
                                </View>
                            </TouchableHighlight>
                        );
                    })}
                </ScrollView>
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
        height: 50,
        borderBottomWidth: 1,
        borderColor: colors.light1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    } as ViewStyle,
    listItemText: {
        color: colors.primary,
    } as TextStyle,
});
