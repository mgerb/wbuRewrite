import React from 'react';
import { View, ScrollView, Text, Keyboard } from 'react-native';

// redux
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { UserStateType } from '../redux/reducers/user';
import { GroupStateType, MessageType } from '../redux/reducers/group';
import groupActions, { GroupActionMapType } from '../redux/actions/group';
import userActions, { UserActionMapType } from '../redux/actions/user';

interface Props {
    navigator: any,
    user: UserStateType,
    group: GroupStateType,
    groupActions: GroupActionMapType,
    userActions: UserActionMapType,
}

interface State {

}

class MessageScrollView extends React.Component<Props, State> {

    private scrollView: any;
    
    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        Keyboard.addListener("keyboardDidShow", () => {
            this.scrollView.scrollToEnd();
        });

        Keyboard.addListener("keyboardDidHide", () => {
            this.scrollView.scrollToEnd();
        });
    }
    render() {
        return (
            <ScrollView style={{flex:1, backgroundColor: 'white'}}
                        ref={(scrollView: any) => {this.scrollView = scrollView}}>

            {this.props.group.selectedGroupMessages.map((message: MessageType, index: number) => {
                return (
                    <View key={index}>
                        <Text>{message.firstName + " " + message.lastName}</Text>
                        <Text>{message.content}</Text>
                    </View>
                );
            })}
            </ScrollView>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(MessageScrollView);
