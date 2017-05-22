import React from 'react';
import { Keyboard, View, ViewStyle, Text, TextInput, TouchableHighlight, StyleSheet } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

// redux
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { GeoStateType } from '../redux/reducers/geo';
import { GroupStateType } from '../redux/reducers/group';
import { UserStateType } from '../redux/reducers/user';
import geoActions, { GeoActionMapType } from '../redux/actions/geo';
import groupActions, { GroupActionMapType } from '../redux/actions/group';
import userActions, { UserActionMapType } from '../redux/actions/user';

import colors from '../style/colors';
import sizes from '../style/sizes';
import wStyles from '../style/wStyles';

import userAPI from '../api/user.api';
import toast from '../utils/toast';

interface Props {
    navigator: any;
    geo: GeoStateType;
    group: GroupStateType;
    user: UserStateType;
    geoActions: GeoActionMapType;
    groupActions: GroupActionMapType;
    userActions: UserActionMapType;
}

interface State {
    feedback: string;
}

class Feedback extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            feedback: "",
        };
    }

    componentWillUnmount() {
        toast.hide();
    }

    private submitFeedback() {
        if (this.state.feedback === "") {
            return;
        }

        userAPI.storeUserFeedback(this.state.feedback).then(() => {
            toast.success("Thank you for your feedback! It really helps!");
        }).catch(() => {

        });

        Keyboard.dismiss();

        this.setState({feedback:""});
    }

    render() {
        return (
            <View style={{flex:1}}>
                <TextInput style={styles.input}
                            multiline={true}
                            value={this.state.feedback}
                            placeholder="Feedback..."
                            onChangeText={(feedback:string) => this.setState({feedback})}/>

                <TouchableHighlight style={[wStyles.button, {marginBottom:0}]} underlayColor={colors.light1} onPress={this.submitFeedback.bind(this)}>
                    <Text style={wStyles.buttonText}>Submit</Text>
                </TouchableHighlight>

                <KeyboardSpacer/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        fontSize: sizes.default,
        padding: 10,
    } as ViewStyle,
});

function mapStateToProps(state: Props): any {
  return {
    geo: state.geo,
    group: state.group,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>): any {
  return {
    geoActions: bindActionCreators(geoActions, dispatch),
    groupActions: bindActionCreators(groupActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
