import { Action, ActionCreatorsMapObject } from 'redux';

import { UserType } from '../reducers/user';
import types from '../constants';

export interface loginFetchAction extends Action {
    email: string,
    password?: string,
    facebookAccessToken?: string,
    userID?: string,
    firstName?: string,
    lastName?: string,
    facebookUser?: boolean,
    jwt?: string,
    lastRefreshTime?: number,
}

function loginFetchRequested(email: string, password: string, facebookAccessToken?: string): loginFetchAction {
    return {
        type: types.LOGIN_FETCH_REQUESTED,
        email,
        password,
        facebookAccessToken,
    };
}

function loginFetchSucceeded(action: loginFetchAction): loginFetchAction {
    return {
        type: types.LOGIN_FETCH_SUCCEEDED,
        userID: action.userID,
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

interface refreshJWTAction extends Action {
    jwt: string,
}

function refreshJWTFetchRequested(jwt: string): refreshJWTAction {
    return {
        type: types.REFRESH_JWT_FETCH_REQUESTED,
        jwt,
    };
}

function refreshJWTFetchSucceeded(jwt: string): refreshJWTAction {
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

export interface actionMapType extends ActionCreatorsMapObject {
    loginFetchRequested: any,
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

const actionMap: actionMapType = {
    loginFetchRequested,
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
