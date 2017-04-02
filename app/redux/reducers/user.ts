import types from '../constants';

export interface UserType {
    id?: number,
    email?: string,
    firstName?: string,
    lastName?: string,
    fcmToken?: string,
    facebookID?: string,
    facebookUser?: boolean,
    jwt?: string,
    lastRefreshTime?: number,
}

export interface UserStateType extends UserType {

    loggedIn: boolean,

    loginFetchRequested: boolean,
    loginFetchSucceeded: boolean,
    loginFetchFailed: boolean,

    searchUserByNameFetchRequested: boolean,
    searchUserByNameFetchSucceeded: boolean,
    searchUserByNameFetchFailed: boolean,

    userSearchList: Array<UserType>,

    refreshJWTFetchRequested: boolean,
    refreshJWTFetchSucceeded: boolean,
    refreshJWTFetchFailed: boolean,
}

const defaultState: UserStateType = {
    id: undefined,
    email: '',
    firstName: '',
    lastName: '',
    facebookUser: false,
    jwt: '',
    lastRefreshTime: 0,

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

function user(state: UserStateType = defaultState, action: any): any {
    switch (action.type) {
        case types.LOGIN_FETCH_REQUESTED:
            return {...state,
                loginFetchRequested: true,
                loginFetchSucceeded: false,
                loginFetchFailed: false,
            };

        case types.LOGIN_FETCH_SUCCEEDED:
            return {...state, 
                id: action.id,
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

        case types.LOGIN_FETCH_FAILED:
            return {...state,
                loginFetchRequested: false,
                loginFetchSucceeded: false,
                loginFetchFailed: true,
            };

        case types.LOGOUT:
            return defaultState;

        case types.SEARCH_USER_BY_NAME_FETCH_REQUESTED:
            return {...state,
                searchUserByNameFetchRequested: true,
                searchUserByNameFetchSucceeded: false,
                searchUserByNameFetchFailed: false,
                userSearchList: [],
            };

        case types.SEARCH_USER_BY_NAME_FETCH_SUCCEEDED:
            return {...state,
                searchUserByNameFetchRequested: false,
                searchUserByNameFetchSucceeded: true,
                searchUserByNameFetchFailed: false,
                userSearchList: action.userSearchList,
            };

        case types.SEARCH_USER_BY_NAME_FETCH_FAILED:
            return {...state,
                searchUserByNameFetchRequested: false,
                searchUserByNameFetchSucceeded: false,
                searchUserByNameFetchFailed: true,
            };

        case types.REFRESH_JWT_FETCH_REQUESTED:
            return {...state,
                refreshJWTFetchRequested: true,
                refreshJWTFetchSucceeded: false,
                refreshJWTFetchFailed: false,
            };

        case types.REFRESH_JWT_FETCH_SUCCEEDED:
            return {...state,
                refreshJWTFetchRequested: false,
                refreshJWTFetchSucceeded: true,
                refreshJWTFetchFailed: false,
            };

        case types.REFRESH_JWT_FETCH_FAILED:
            return {...state,
                refreshJWTFetchRequested: false,
                refreshJWTFetchSucceeded: false,
                refreshJWTFetchFailed: true,
            };
    }

    return state;
}

export default user;
