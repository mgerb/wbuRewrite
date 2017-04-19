import React from 'react';
import { View, ViewStyle, StyleSheet, Text, TextStyle } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

import { GroupType } from '../redux/reducers/group';
import colors from '../style/colors';
import sizes from '../style/sizes';

interface Props {
    navigator: any;
    selectedGroup: GroupType;
}

interface State {

}

export default class DashboardNavigator extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    private toggleDrawer(drawer: string): void {
        this.props.navigator.toggleDrawer({
            side: drawer,
            animated: true,
            to: 'open',
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <Icon name="navicon" style={styles.icon} onPress={() => this.toggleDrawer('left')}/>
                    <Text style={styles.name} numberOfLines={1}>{this.props.selectedGroup.name}</Text>
                    <Icon2 name="google-maps" style={styles.icon}/>
                    <Icon name="group" style={styles.icon} onPress={() => this.toggleDrawer('right')}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        backgroundColor: colors.dark1,
        flexDirection: "column",
        justifyContent: "flex-end",
        borderBottomWidth: 1,
        borderBottomColor: colors.dark2,
    } as ViewStyle,
    buttonContainer: {
        flexDirection: "row",
    } as ViewStyle,
    name: {
        fontSize: sizes.large,
        color: colors.white,
        flex: 1,
        padding: 10,
    } as TextStyle,
    icon: {
        fontSize: sizes.large,
        color: colors.white,
        padding: 10,
    } as TextStyle,
});
