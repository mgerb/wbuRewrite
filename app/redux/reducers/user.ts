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
    password?: string,
    facebookAccessToken?: string,
}

export interface UserStateType extends UserType {

    loggedIn: boolean,

    loginFetchRequested: boolean,
    loginFetchSucceeded: boolean,
    loginFetchFailed: boolean,

    searchUserByNameFetchRequested: boolean,
    searchUserByNameFetchSucceeded: boolean,
    searchUserByNameFetchFailed: boolean,

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

    refreshJWTFetchRequested: false,
    refreshJWTFetchSucceeded: false,
    refreshJWTFetchFailed: false,
};

function user(state: UserStateType = defaultState, action: any): any {
    switch (action.type) {
        case types.RESET_USER_STATE:
            return defaultState;

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
