import types from '../constants';
import { Action, ActionCreatorsMapObject } from 'redux';

interface GroupActionType extends Action {
    id?: number,
    name?: string,
    ownerName?: string,
    ownerEmail?: string,
    userCount?: number,
}

function createGroupFetchRequested(name: string): GroupActionType {
    return {
        type: types.CREATE_GROUP_FETCH_REQUESTED,
        name,
    };
}

function createGroupFetchSucceeded(): Action {
    return {
        type: types.CREATE_GROUP_FETCH_SUCCEEDED,
    };
}

function createGroupFetchFailed(): Action {
    return {
        type: types.CREATE_GROUP_FETCH_FAILED,
    };
}

export interface GroupActionMapType extends ActionCreatorsMapObject {
    createGroupFetchRequested: any,
    createGroupFetchSucceeded: any,
    createGroupFetchFailed: any,
}

const actionMap: GroupActionMapType = {
    createGroupFetchRequested,
    createGroupFetchSucceeded,
    createGroupFetchFailed,
};

export default actionMap;
