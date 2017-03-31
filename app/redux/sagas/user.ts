import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { setAuthorizationHeader, resetAuthorizationHeader } from '../../api/api';
import userAPI from '../../api/user.api';
import types from '../constants';
import userActions, { loginFetchAction } from '../actions/user';
import storage from '../../utils/storage';
import navigation from '../../navigation';

function* fetchLogin(action: loginFetchAction) {
    try {
        const response = yield call(userAPI.login, action.email, action.password)
        yield call(storage.storeUserLogin, response.data);
        yield put(userActions.loginFetchSucceeded(action));
    } catch (error) {
        yield put(userActions.loginFetchFailed());
    }
}

// set the jwt auth header every time a login succeeds
function* loginSucceeded(action: any) {
    yield setAuthorizationHeader(action.jwt);
}

function* logout() {
    yield call(storage.removeLogin);
    yield resetAuthorizationHeader();
    yield navigation.Login();
}


// WATCHES -------------------
function* watchFetchLogin() {
    yield takeLatest(types.LOGIN_FETCH_REQUESTED, fetchLogin);
}

function* watchLoginSucceeded() {
    yield takeEvery(types.LOGIN_FETCH_SUCCEEDED, loginSucceeded);
}

function* watchLogout() {
    yield takeEvery(types.LOGOUT, logout);
}

export default [
    watchFetchLogin(),
    watchLoginSucceeded(),
    watchLogout(),
]
