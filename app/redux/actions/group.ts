import types from '../constants';
import { Action, ActionCreatorsMapObject } from 'redux';
import { GroupType } from '../reducers/group';

interface GroupActionType extends GroupType, Action {
    groups?: Array<GroupType>,
}

function getUserGroupsFetchRequested(name: string): GroupActionType {
    return {
        type: types.GET_USER_GROUPS_FETCH_REQUESTED,
        name,
    };
}

function getUserGroupsFetchSucceeded(groups: Array<GroupType>): GroupActionType {
    return {
        type: types.GET_GROUP_USERS_FETCH_SUCCEEDED,
        groups,
    };
}

function getUserGroupsFetchFailed(): Action {
    return {
        type: types.GET_USER_GROUPS_FETCH_FAILED,
    };
}

export interface GroupActionMapType extends ActionCreatorsMapObject {
    getUserGroupsFetchRequested: any,
    getUserGroupsFetchSucceeded: any,
    getUserGroupsFetchFailed: any,
}

const actionMap: GroupActionMapType = {
    getUserGroupsFetchRequested,
    getUserGroupsFetchSucceeded,
    getUserGroupsFetchFailed,
};

export default actionMap;
