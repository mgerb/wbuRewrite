import _ from 'lodash';
import types from '../constants';
import { UserType } from './user';

export interface GroupType  {
    id?: number,
    name?: string,
    ownerID?: number,
    ownerEmail?: string,
    ownerName?: string,
    userCount?: number,
    locked?: boolean,
    public?: boolean,
}


export interface MessageType {
    id: number,
    userID: number,
    groupID: number,
    firstName: string,
    lastName: string,
    content: string,
    timestamp: string,
}

export interface GroupStateType {
    selectedGroup: GroupType,
    selectedGroupUsers: Array<UserType>,
    selectedGroupMessages: Array<MessageType>,
    groups: Array<GroupType>,

    getUserGroupsFetchRequested: boolean,
    getUserGroupsFetchSucceeded: boolean,
    getUserGroupsFetchFailed: boolean,

    getGroupUsersFetchRequested: boolean,
    getGroupUsersFetchSucceeded: boolean,
    getGroupUsersFetchFailed: boolean,

    getGroupMessagesFetchRequested: boolean,
    getGroupMessagesFetchSucceeded: boolean,
    getGroupMessagesFetchFailed: boolean,
}

const defaultState: GroupStateType = {
    selectedGroup: {},
    selectedGroupUsers: [],
    selectedGroupMessages: [],
    groups: [],

    getUserGroupsFetchRequested: false,
    getUserGroupsFetchSucceeded: false,
    getUserGroupsFetchFailed: false,

    getGroupUsersFetchRequested: false,
    getGroupUsersFetchSucceeded: false,
    getGroupUsersFetchFailed: false,

    getGroupMessagesFetchRequested: false,
    getGroupMessagesFetchSucceeded: false,
    getGroupMessagesFetchFailed: false,
};

function group(state: GroupStateType = defaultState, action: any): any {
    switch (action.type) {
        case types.RESET_GROUP_STATE:
            return defaultState;

        case types.SET_SELECTED_GROUP:
            return {...state,
                selectedGroup: _.clone(action.selectedGroup),
                // reset messages upon new selected group
                selectedGroupMessages: [],
            };

        case types.GET_USER_GROUPS_FETCH_REQUESTED:
            return {...state,
                getUserGroupsFetchRequested: true,
                getUserGroupsFetchSucceeded: false,
                getUserGroupsFetchFailed: false,
            };

        case types.GET_USER_GROUPS_FETCH_SUCCEEDED:
            return {...state,
                groups: action.groups,
                getUserGroupsFetchRequested: false,
                getUserGroupsFetchSucceeded: true,
                getUserGroupsFetchFailed: false,
            };

        case types.GET_USER_GROUPS_FETCH_FAILED:
            return {...state,
                getUserGroupsFetchRequested: false,
                getUserGroupsFetchSucceeded: false,
                getUserGroupsFetchFailed: true,
            };

        case types.GET_GROUP_USERS_FETCH_REQUESTED:
            return {...state,
                getGroupUsersFetchRequested: true,
                getGroupUsersFetchSucceeded: false,
                getGroupUsersFetchFailed: false,
            };

        case types.GET_GROUP_USERS_FETCH_SUCCEEDED:
            return {...state,
                selectedGroupUsers: _.clone(action.selectedGroupUsers),
                getGroupUsersFetchRequested: false,
                getGroupUsersFetchSucceeded: true,
                getGroupUsersFetchFailed: false,
            };

        case types.GET_GROUP_USERS_FETCH_FAILED:
            return {...state,
                getGroupUsersFetchRequested: false,
                getGroupUsersFetchSucceeded: false,
                getGroupUsersFetchFailed: true,
            };

        case types.GET_GROUP_MESSAGES_FETCH_REQUESTED:
            return {...state,
                getGroupMessagesFetchRequested: true,
                getGroupMessagesFetchSucceeded: false,
                getGroupMessagesFetchFailed: false,
            };

        case types.GET_GROUP_MESSAGES_FETCH_SUCCEEDED:
            return {...state,
                selectedGroupMessages: action.messages,
                getGroupMessagesFetchRequested: false,
                getGroupMessagesFetchSucceeded: true,
                getGroupMessagesFetchFailed: false,
            };

        case types.GET_GROUP_MESSAGES_FETCH_FAILED:
            return {...state,
                getGroupMessagesFetchRequested: false,
                getGroupMessagesFetchSucceeded: false,
                getGroupMessagesFetchFailed: true,
            };
    }

    return state;
}

export default group;
