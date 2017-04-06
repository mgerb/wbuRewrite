import _ from 'lodash';
import React from 'react';
import { View, ViewStyle, ScrollView, TextStyle, Text, TextInput, StyleSheet, TouchableHighlight, Keyboard} from 'react-native';
import groupAPI from '../api/group.api';
import { GroupType } from '../redux/reducers/group';
import toast from '../utils/toast';

interface Props {
    navigator: any,
}

interface State {
    searchGroup: string,
    groupList: Array<GroupType>,
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
                    <TouchableHighlight style={styles.submitButton} activeOpacity={50} underlayColor={'red'} onPress={ this.fetchSearchPublicGroup.bind(this) }>
                        <Text>Search</Text>
                    </TouchableHighlight>
                </View>

                <ScrollView>
                    {this.state.groupList.map((group: GroupType, index: number) => {
                        return (
                            <TouchableHighlight key={index} onPress={() => this.navigateGroupInfo(group)}>
                                <View>
                                    <Text>{group.name}</Text>
                                    <Text>{group.ownerEmail}</Text>
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
