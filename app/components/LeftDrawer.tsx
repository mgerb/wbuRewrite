import React from 'react';
import { View, ViewStyle, Text, TextStyle, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// redux
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { UserStateType } from '../redux/reducers/user';
import { GroupStateType, GroupType } from '../redux/reducers/group';

import groupActions, { GroupActionMapType } from '../redux/actions/group';
import userActions, { UserActionMapType } from '../redux/actions/user';

import navigation from '../navigation';
import colors from '../style/colors';
import sizes from '../style/sizes';

interface Props {
    user:  UserStateType;
    group: GroupStateType;
    groupActions: GroupActionMapType;
    userActions: UserActionMapType;
    navigator: any;
}

interface State {

}

class LeftDrawer extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

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
            <View style={styles.header}>
                <Text style={styles.headerText}>{this.props.user.firstName + " " + this.props.user.lastName}</Text>
            </View>
                
            <ScrollView>
                {this.props.group.groups.map((group: GroupType, index: number) => {
                    const selectedStyle = group.id === this.props.group.selectedGroup.id ? styles.itemContainerSelected : {};
                    return (
                        <TouchableHighlight key={index}
                                            underlayColor={colors.dark2}
                                            style={[styles.itemContainer, selectedStyle]}
                                            onPress={() => this.setSelectedGroup(group)}>
                            <Text style={styles.itemText}>
                                {group.name}
                            </Text>
                        </TouchableHighlight>
                    );
                })}
            </ScrollView>

            <View style={styles.footer}>
                <Icon name="plus"
                        style={styles.icon}
                        onPress={() => navigation.GroupSegue()}/>
                <Icon name="email-variant"
                        style={styles.icon}
                        onPress={() => navigation.GroupInvites()}/>
                <Icon name="settings"
                        style={styles.icon}
                        onPress={navigation.Settings.bind(this)}/>
                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(LeftDrawer);

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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: colors.dark2,
    } as ViewStyle,
    itemContainer: {
        height: 50,
        justifyContent: 'center',
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
    icon: {
        fontSize: sizes.large,
        color: colors.white,
    } as TextStyle,
});
