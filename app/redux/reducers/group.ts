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

    groupUsers?: Array<UserType>,
}

export interface GroupStateType {
    selectedGroup: GroupType,
    groups: Array<GroupType>,

    getUserGroupsFetchRequested: boolean,
    getUserGroupsFetchSucceeded: boolean,
    getUserGroupsFetchFailed: boolean,

    getGroupUsersFetchRequested: boolean,
    getGroupUsersFetchSucceeded: boolean,
    getGroupUsersFetchFailed: boolean,
}

const defaultState: GroupStateType = {
    selectedGroup: {},
    groups: [],

    getUserGroupsFetchRequested: false,
    getUserGroupsFetchSucceeded: false,
    getUserGroupsFetchFailed: false,

    getGroupUsersFetchRequested: false,
    getGroupUsersFetchSucceeded: false,
    getGroupUsersFetchFailed: false,
};

function group(state: GroupStateType = defaultState, action: any): any {
    switch (action.type) {
        case types.RESET_GROUP_STATE:
            return defaultState;

        case types.SET_SELECTED_GROUP:
            return {...state,
                selectedGroup: {...{},
                    selectedGroup: action.selectedGroup,
                },
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

    }

    return state;
}

export default group;
