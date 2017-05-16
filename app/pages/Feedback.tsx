import React from 'react';
import { View, Text } from 'react-native';

// redux
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { GeoStateType } from '../redux/reducers/geo';
import { GroupStateType } from '../redux/reducers/group';
import { UserStateType } from '../redux/reducers/user';
import geoActions, { GeoActionMapType } from '../redux/actions/geo';
import groupActions, { GroupActionMapType } from '../redux/actions/group';
import userActions, { UserActionMapType } from '../redux/actions/user';

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

}

class Feedback extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Text>This is a template</Text>
            </View>
        );
    }
}

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
