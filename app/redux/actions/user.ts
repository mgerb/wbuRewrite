import { Action, ActionCreatorsMapObject } from 'redux';

import { UserType } from '../reducers/user';
import types from '../constants';

function resetUserState(): Action {
    return {
        type: types.RESET_USER_STATE,
    }
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

function refreshJWTFetchRequested(jwt: string): any {
    return {
        type: types.REFRESH_JWT_FETCH_REQUESTED,
        jwt,
    };
}

function refreshJWTFetchSucceeded(jwt: string): any {
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

export interface UserActionMapType extends ActionCreatorsMapObject {
    resetUserState: any,
    loginFetchRequested: any,
    loginFacebookFetchRequested: any,
    loginFetchSucceeded: any,
    loginFetchFailed: any,
    refreshJWTFetchRequested: any,
    refreshJWTFetchSucceeded: any,
    refreshJWTFetchFailed: any,
}

const actionMap: UserActionMapType = {
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
