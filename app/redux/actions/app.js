import * as types from '../constants';

export function login() {
    return {
        type: types.LOGIN
    };
}

export function fetchLogin() {
    return {
        type: types.FETCH_LOGIN
    };
}