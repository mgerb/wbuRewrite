import * as types from '../constants';

export function loginFetchRequested(email: string, password: string, facebookAccessToken: string = null) {
    return {
        type: types.LOGIN_FETCH_REQUESTED,
        email,
        password,
        facebookAccessToken,
    };
}

export function loginFetchSucceeded(userID: string, email: string, firstName: string, lastName: string, facebookUser: bool, jwt: string, lastRefreshTime: number) {
    return {
        type: types.LOGIN_FETCH_SUCCEEDED,
        userID,
        email,
        firstName,
        lastName,
        facebookUser,
        jwt,
        lastRefreshTime,
    };
}

export function loginFetchFailed() {
    return {
        type: types.LOGIN_FETCH_FAILED,
    };
}

export function searchUserByNameFetchRequested(name) {
    return {
        type: types.SEARCH_USER_BY_NAME_FETCH_REQUESTED,
        name,
    };
}

export function searchUserByNameFetchSucceeded(userSearchList) {
    return {
        type: types.SEARCH_USER_BY_NAME_FETCH_SUCCEEDED,
        userSearchList,
    };
}

export function searchUserByNameFetchFailed() {
    return {
        type: types.SEARCH_USER_BY_NAME_FETCH_FAILED,
    };
}

export function refreshJWTFetchRequested(jwt) {
    return {
        type: types.REFRESH_JWT_FETCH_REQUESTED,
        jwt,
    };
}

export function refreshJWTFetchSucceeded(jwt) {
    return {
        type: types.REFRESH_JWT_FETCH_SUCCEEDED,
        jwt,
    };
}

export function refreshJWTFetchFailed() {
    return {
        type: types.REFRESH_JWT_FETCH_FAILED,
    };
}
