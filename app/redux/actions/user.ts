import { Action, ActionCreatorsMapObject } from 'redux';

import { UserType } from '../reducers/user';
import types from '../constants';

export interface UserActionType extends Action {
    id?: string,
    email?: string,
    password?: string,
    facebookAccessToken?: string,
    firstName?: string,
    lastName?: string,
    facebookUser?: boolean,
    jwt?: string,
    lastRefreshTime?: number,
}

function loginFetchRequested(email: string, password: string): UserActionType {
    return {
        type: types.LOGIN_FETCH_REQUESTED,
        email,
        password,
    };
}

function loginFacebookFetchRequested(facebookAccessToken: string): UserActionType {
    return {
        type: types.LOGIN_FACEBOOK_FETCH_REQUESTED,
        facebookAccessToken,
    };
}

function loginFetchSucceeded(action: UserActionType): UserActionType {
    return {
        type: types.LOGIN_FETCH_SUCCEEDED,
        id: action.id,
        email: action.email,
        firstName: action.firstName,
        lastName: action.lastName,
        facebookUser: action.facebookUser,
        jwt: action.jwt,
        lastRefreshTime: action.lastRefreshTime,
    };
}

function loginFetchFailed(): Action {
    return {
        type: types.LOGIN_FETCH_FAILED,
    };
}

interface searchUserAction extends Action {
    name?: string,
    userSearchList?: Array<UserType>,
}

function searchUserByNameFetchRequested(name: string): searchUserAction {
    return {
        type: types.SEARCH_USER_BY_NAME_FETCH_REQUESTED,
        name,
    };
}

function searchUserByNameFetchSucceeded(userSearchList: Array<UserType>): searchUserAction {
    return {
        type: types.SEARCH_USER_BY_NAME_FETCH_SUCCEEDED,
        userSearchList,
    };
}

function searchUserByNameFetchFailed(): searchUserAction {
    return {
        type: types.SEARCH_USER_BY_NAME_FETCH_FAILED,
    };
}

function refreshJWTFetchRequested(jwt: string): UserActionType {
    return {
        type: types.REFRESH_JWT_FETCH_REQUESTED,
        jwt,
    };
}

function refreshJWTFetchSucceeded(jwt: string): UserActionType {
    return {
        type: types.REFRESH_JWT_FETCH_SUCCEEDED,
        jwt,
    };
}

function refreshJWTFetchFailed(): Action {
    return {
        type: types.REFRESH_JWT_FETCH_FAILED,
    };
}

function logout(): Action {
    return {
        type: types.LOGOUT,
    }
}

export interface UserActionMapType extends ActionCreatorsMapObject {
    loginFetchRequested: any,
    loginFacebookFetchRequested: any,
    loginFetchSucceeded: any,
    loginFetchFailed: any,
    searchUserByNameFetchRequested: any,
    searchUserByNameFetchSucceeded: any,
    searchUserByNameFetchFailed: any,
    refreshJWTFetchRequested: any,
    refreshJWTFetchSucceeded: any,
    refreshJWTFetchFailed: any,
    logout: any,
}

const actionMap: UserActionMapType = {
    loginFetchRequested,
    loginFacebookFetchRequested,
    loginFetchSucceeded,
    loginFetchFailed,
    searchUserByNameFetchRequested,
    searchUserByNameFetchSucceeded,
    searchUserByNameFetchFailed,
    refreshJWTFetchRequested,
    refreshJWTFetchSucceeded,
    refreshJWTFetchFailed,
    logout,
};

export default actionMap;
