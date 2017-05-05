import types from '../constants';
import { Action, ActionCreatorsMapObject } from 'redux';
import { GroupType, MessageType } from '../reducers/group';
import { UserType } from '../reducers/user';

function resetGroupState(): Action {
    return {
        type: types.RESET_GROUP_STATE,
    };
}

function setSelectedGroupByID(groupID: number): any {
    return {
        type: types.SET_SELECTED_GROUP_BY_ID,
        groupID,
    };
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

function getGroupMessagesFromStorage(groupID: number): any {
    return {
        type: types.GET_GROUP_MESSAGES_FROM_STORAGE,
        groupID,
    };
}

function getGroupMessagesFetchRequested(groupID: number): any {
    return {
        type: types.GET_GROUP_MESSAGES_FETCH_REQUESTED,
        groupID,
    };
}

function getGroupMessagesFetchSucceeded(): Action {
    return {
        type: types.GET_GROUP_MESSAGES_FETCH_SUCCEEDED,
    };
}

function getGroupMessagesFetchFailed(): Action {
    return {
        type: types.GET_GROUP_MESSAGES_FETCH_FAILED,
    };
}

function setGroupMessages(messages: Array<MessageType>): any {
    return {
        type: types.SET_GROUP_MESSAGES,
        messages,
    };
}
export interface GroupActionMapType extends ActionCreatorsMapObject {
    resetGroupState: any;
    setSelectedGroupByID: any;
    setSelectedGroup: any;
    getUserGroupsFetchRequested: any;
    getUserGroupsFetchSucceeded: any;
    getUserGroupsFetchFailed: any;
    getGroupUsersFetchRequested: any;
    getGroupUsersFetchSucceeded: any;
    getGroupUsersFetchFailed: any;
    getGroupMessagesFromStorage: any;
    getGroupMessagesFetchRequested: any;
    getGroupMessagesFetchSucceeded: any;
    getGroupMessagesFetchFailed: any;
    setGroupMessages: any;
}

const actionMap: GroupActionMapType = {
    resetGroupState,
    setSelectedGroup,
    setSelectedGroupByID,
    getUserGroupsFetchRequested,
    getUserGroupsFetchSucceeded,
    getUserGroupsFetchFailed,
    getGroupUsersFetchRequested,
    getGroupUsersFetchSucceeded,
    getGroupUsersFetchFailed,
    getGroupMessagesFromStorage,
    getGroupMessagesFetchRequested,
    getGroupMessagesFetchSucceeded,
    getGroupMessagesFetchFailed,
    setGroupMessages,
};

export default actionMap;
