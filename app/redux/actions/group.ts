import types from '../constants';
import { Action, ActionCreatorsMapObject } from 'redux';
import { GroupType } from '../reducers/group';
import { UserType } from '../reducers/user';

function resetGroupState(): Action {
    return {
        type: types.RESET_GROUP_STATE,
    }
}

function setSelectedGroup(selectedGroup: GroupType): any {
    return {
        type: types.SET_SELECTED_GROUP,
        selectedGroup,
    };
}

function getUserGroupsFetchRequested(): Action {
    return {
        type: types.GET_USER_GROUPS_FETCH_REQUESTED,
    };
}

function getUserGroupsFetchSucceeded(groups: Array<GroupType>): any {
    return {
        type: types.GET_USER_GROUPS_FETCH_SUCCEEDED,
        groups,
    };
}

function getUserGroupsFetchFailed(): Action {
    return {
        type: types.GET_USER_GROUPS_FETCH_FAILED,
    };
}

function getGroupUsersFetchRequested(): Action {
    return {
        type: types.GET_GROUP_USERS_FETCH_REQUESTED,
    };
}

function getGroupUsersFetchSucceeded(selectedGroupUsers: Array<UserType>): any {
    return {
        type: types.GET_GROUP_USERS_FETCH_SUCCEEDED,
        selectedGroupUsers,
    };
}

function getGroupUsersFetchFailed(): Action {
    return {
        type: types.GET_GROUP_USERS_FETCH_FAILED,
    };
}

export interface GroupActionMapType extends ActionCreatorsMapObject {
    resetGroupState: any,
    setSelectedGroup: any,
    getUserGroupsFetchRequested: any,
    getUserGroupsFetchSucceeded: any,
    getUserGroupsFetchFailed: any,
    getGroupUsersFetchRequested: any,
    getGroupUsersFetchSucceeded: any,
    getGroupUsersFetchFailed: any,
}

const actionMap: GroupActionMapType = {
    resetGroupState,
    setSelectedGroup,
    getUserGroupsFetchRequested,
    getUserGroupsFetchSucceeded,
    getUserGroupsFetchFailed,
    getGroupUsersFetchRequested,
    getGroupUsersFetchSucceeded,
    getGroupUsersFetchFailed,
};

export default actionMap;
