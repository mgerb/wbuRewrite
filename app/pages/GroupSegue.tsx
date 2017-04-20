import React from 'react';
import { View, ViewStyle, StyleSheet, Text, TouchableHighlight } from 'react-native';
import navigation, { ClosableModal } from '../navigation';

import colors from '../style/colors';
import wStyles from '../style/wStyles';

interface Props {
    navigator: any;
}

interface State {

}

export default class GroupSegue extends React.Component<Props, State> implements ClosableModal {

    static navigatorStyle = {...navigation.NavStyle};

    constructor(props: Props) {
        super(props);

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event: any): void {
        if (event.type == "NavBarButtonPress") {
            if (event.id == "close") {
                this.props.navigator.dismissModal();
            }
        }
    }

    private navigateCreateGroup() {
        this.props.navigator.push({
            screen: "CreateGroup",
            title: "Create Group",
        });
    }

    private navigateGroupSearch() {
        this.props.navigator.push({
            screen: "GroupSearch",
            title: "Group Search",
        });
    }

    render() {
        return (
            <View style={styles.container}>

                <TouchableHighlight style={wStyles.button} underlayColor={colors.light1} onPress={this.navigateCreateGroup.bind(this)}>
                    <Text style={wStyles.buttonText}>Create Group</Text>
                </TouchableHighlight>

                <TouchableHighlight style={wStyles.button} underlayColor={colors.light1} onPress={this.navigateGroupSearch.bind(this)}>
                    <Text style={wStyles.buttonText}>Join Group</Text>
                </TouchableHighlight>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    } as ViewStyle,
});
