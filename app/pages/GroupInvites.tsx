import React from 'react';
import { View, ViewStyle, ScrollView, Text, TextStyle, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import groupAPI from '../api/group.api';
import store from '../redux/store';
import groupActions from '../redux/actions/group';
import { GroupType } from '../redux/reducers/group';
import toast from '../utils/toast';
import navigation, { ClosableModal } from '../navigation';

import colors from '../style/colors';
import sizes from '../style/sizes';

interface Props {
    navigator: any;
}

interface State {
    groupList: Array<GroupType>;
}

export default class CreateGroup extends React.Component<Props, State> implements ClosableModal {

    static navigatorStyle = {...navigation.NavStyle};

    constructor(props: Props) {
        super(props);
        this.state = {
            groupList: [],
        };
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event: any): void {
        if (event.type === "NavBarButtonPress" && event.id === "close") {
            this.props.navigator.dismissModal();
        }
    }

    componentDidMount() {
        this.fetchGetGroupInvites();
    }

    private fetchGetGroupInvites() {
        groupAPI.getGroupInvites().then((response: any) => {
            this.setState({
                groupList: response.data,
            })
        });
    }

    private fetchJoinGroupFromInvite(groupID?: number) {
        groupAPI.joinGroupFromInvite(groupID).then(() => {
            toast.success("Group joined!");

            // refresh user groups after group creation
            store.dispatch(groupActions.getUserGroupsFetchRequested());

            this.fetchGetGroupInvites();
        }).catch(() => {});
    }

    public render() {
        return (
            <View style={styles.container}>
                {this.state.groupList.length > 0 ?

                <ScrollView>
                    {this.state.groupList.map((group: GroupType, index: number) => {
                        return (
                            <View key={index} style={styles.listItem}>

                                <View>
                                    <Text style={[styles.listItemText, {fontSize: sizes.default}]}>{group.name}</Text>
                                    <Text style={styles.listItemText}>{group.ownerEmail}</Text>
                                </View>

                                <View style={{flexDirection:'row'}}>
                                    <Icon name="delete" style={{fontSize: sizes.large, color: colors.red, marginRight: 20}}/>
                                    <Icon name="check"
                                        style={{fontSize: sizes.large, color: colors.green}}
                                        onPress={() => this.fetchJoinGroupFromInvite(group.id)}/>
                                </View>
                            </View>
                        );
                    })}
                </ScrollView>
                :
                    <View style={styles.noInvitesContainer}>
                        <Text style={styles.noInvitesText}>No invites.</Text>
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    } as ViewStyle,
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
    noInvitesContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    } as ViewStyle,
    noInvitesText: {
        fontSize: sizes.default,
        color: colors.primary,
    } as TextStyle,
});
