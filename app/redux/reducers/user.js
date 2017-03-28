// @flow

import * as types from '../constants';

type stateType = {
}

type actionType = {
    type: string,
}

const defaultState: stateType = {
    userID: '',
    email: '',
    firstName: '',
    lastName: '',
    facebookUser: false,
    jwt: '',
    lastRefreshTime: '',

    loggedIn: false,

    loginFetchRequested: false,
    loginFetchSucceeded: false,
    loginFetchFailed: false,

    searchUserByNameFetchRequested: false,
    searchUserByNameFetchSucceeded: false,
    searchUserByNameFetchFailed: false,

    userSearchList: [],

    refreshJWTFetchRequested: false,
    refreshJWTFetchSucceeded: false,
    refreshJWTFetchFailed: false,
};

function user(state: stateType = defaultState, action: actionType) {
    switch (action.type) {
        case types.LOGIN_FETCH_SUCCEEDED:
            return {state, 
                userID: action.userID,
                email: action.email,
                firstName: action.firstName,
                lastName: action.lastName,
                facebookUser: action.facebookUser,
                jwt: action.jwt,
                lastRefreshTime: action.lastRefreshTime,
                loggedIn: true,
                
                loginFetchRequested: false,
                loginFetchSucceeded: true,
                loginFetchFailed: false,
            };

        case types.LOGIN_FETCH_REQUESTED:
            return {state,
                loginFetchRequested: true,
                loginFetchSucceeded: false,
                loginFetchFailed: false,
            };

        case types.LOGIN_FETCH_FAILED:
            return {state,
                loginFetchRequested: false,
                loginFetchSucceeded: false,
                loginFetchFailed: true,
            };

        case types.LOGOUT:
            return defaultState;

        case types.SEARCH_USER_BY_NAME_FETCH_REQUESTED:
            return {state,
                searchUserByNameFetchRequested: true,
                searchUserByNameFetchSucceeded: false,
                searchUserByNameFetchFailed: false,
                userSearchList: [],
            };

        case types.SEARCH_USER_BY_NAME_FETCH_SUCCEEDED:
            return {state,
                searchUserByNameFetchRequested: false,
                searchUserByNameFetchSucceeded: true,
                searchUserByNameFetchFailed: false,
                userSearchList: action.userSearchList,
            };

        case types.SEARCH_USER_BY_NAME_FETCH_FAILED:
            return {state,
                searchUserByNameFetchRequested: false,
                searchUserByNameFetchSucceeded: false,
                searchUserByNameFetchFailed: true,
            };

        case types.REFRESH_JWT_FETCH_REQUESTED:
            return {state,
                refreshJWTFetchRequested: true,
                refreshJWTFetchSucceeded: false,
                refreshJWTFetchFailed: false,
            };

        case types.REFRESH_JWT_FETCH_SUCCEEDED:
            return {state,
                refreshJWTFetchRequested: false,
                refreshJWTFetchSucceeded: true,
                refreshJWTFetchFailed: false,
            };

        case types.REFRESH_JWT_FETCH_FAILED:
            return {state,
                refreshJWTFetchRequested: false,
                refreshJWTFetchSucceeded: false,
                refreshJWTFetchFailed: true,
            };
    }

    return state;
}

export default user;
