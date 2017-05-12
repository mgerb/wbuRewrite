import { Action, ActionCreatorsMapObject } from 'redux';

import { UserType } from '../reducers/user';
import types from '../constants';

function logout(): Action {
    return {
        type: types.LOGOUT,
    };
}

function resetUserState(): Action {
    return {
        type: types.RESET_USER_STATE,
    };
}

function loginFetchRequested(email: string, password: string): any {
    return {
        type: types.LOGIN_FETCH_REQUESTED,
        email,
        password,
    };
}

function loginFacebookFetchRequested(facebookAccessToken: string): any {
    return {
        type: types.LOGIN_FACEBOOK_FETCH_REQUESTED,
        facebookAccessToken,
    };
}

function loginFetchSucceeded(action: UserType): any {
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

function refreshJWTFetchRequested(): Action {
    return {
        type: types.REFRESH_JWT_FETCH_REQUESTED,
    };
}

function refreshJWTFetchSucceeded(jwt: string, lastRefreshTime: number): any {
    return {
        type: types.REFRESH_JWT_FETCH_SUCCEEDED,
        jwt,
        lastRefreshTime,
    };
}

function refreshJWTFetchFailed(): Action {
    return {
        type: types.REFRESH_JWT_FETCH_FAILED,
    };
}

export interface UserActionMapType extends ActionCreatorsMapObject {
    logout(): any;
    resetUserState(): any;
    loginFetchRequested(email: string, password: string): any;
    loginFacebookFetchRequested(facebookAccessToken: string): any;
    loginFetchSucceeded(action: UserType): any;
    loginFetchFailed(): any;
    refreshJWTFetchRequested(): any;
    refreshJWTFetchSucceeded(jwt: string, lastRefreshTime: number): any;
    refreshJWTFetchFailed(): any;
}

const actionMap: UserActionMapType = {
    logout,
    resetUserState,
    loginFetchRequested,
    loginFacebookFetchRequested,
    loginFetchSucceeded,
    loginFetchFailed,
    refreshJWTFetchRequested,
    refreshJWTFetchSucceeded,
    refreshJWTFetchFailed,
};

export default actionMap;
