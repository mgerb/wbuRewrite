import React from 'react';
import { View, ViewStyle, Text, StyleSheet, TouchableHighlight} from 'react-native';
import groupAPI from '../api/group.api';
import store from '../redux/store';
import groupActions from '../redux/actions/group';
import { GroupType } from '../redux/reducers/group';
import toast from '../utils/toast';
import navigation, { ClosableModal } from '../navigation';

interface Props {
    navigator: any,
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
        if (event.type == "NavBarButtonPress") {
            if (event.id == "close") {
                this.props.navigator.dismissModal();
            }
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
        }).catch(() => {});
    }

    public render() {
        return (
            <View style={styles.container}>
                {this.state.groupList.map((group: GroupType, index: number) => {
                    return (
                        <TouchableHighlight key={index} onPress={() => this.fetchJoinGroupFromInvite(group.id)}>
                            <View>
                                <Text>{group.name}</Text>
                                <Text>{group.ownerEmail}</Text>
                            </View>
                        </TouchableHighlight>
                    );
                })}
                
                {this.state.groupList.length < 1 ? <Text>No invites!</Text> : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,
});
