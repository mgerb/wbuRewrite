import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { setAuthorizationHeader, resetAuthorizationHeader } from '../../api/api';
import userAPI from '../../api/user.api';
import types from '../constants';
import userActions from '../actions/user';
import groupActions from '../actions/group';
import storage from '../../utils/storage';
import { UserType } from '../reducers/user';
import navigation from '../../navigation';

function* fetchLoginRequested(action: UserType): any {
    try {
        const response = yield call(userAPI.login, action.email, action.password)
        yield call(storage.storeUserState, response.data);
        yield put(userActions.loginFetchSucceeded(response.data));
    } catch (error) {
        yield put(userActions.loginFetchFailed());
    }
}

function* fetchFacebookLoginRequested(action: UserType): any {
    try {
        const response = yield call(userAPI.loginFacebook, action.facebookAccessToken)
        yield call(storage.storeUserState, response.data);
        yield put(userActions.loginFetchSucceeded(response.data));
    } catch (error) {
        yield put(userActions.loginFetchFailed());
    }
}

// set the jwt auth header every time a login succeeds
function* loginFetchSucceeded(action: any): any {
    yield setAuthorizationHeader(action.jwt);
    yield put(groupActions.getUserGroupsFetchRequested());
}

// reset storage and navigate to login screen
function* logout(): any {
    yield call(storage.removeAllKeys);
    yield put(userActions.resetUserState());
    yield put(groupActions.resetGroupState());
    yield resetAuthorizationHeader();
    yield navigation.Login();
}

// WATCHES -------------------
function* watchLoginFetchRequested() {
    yield takeLatest(types.LOGIN_FETCH_REQUESTED, fetchLoginRequested);
}

function* watchLoginFacebookFetchRequested() {
    yield takeLatest(types.LOGIN_FACEBOOK_FETCH_REQUESTED, fetchFacebookLoginRequested);
}

function* watchLoginFetchSucceeded() {
    yield takeEvery(types.LOGIN_FETCH_SUCCEEDED, loginFetchSucceeded);
}

function* watchLogout() {
    yield takeEvery(types.LOGOUT, logout);
}

export default [
    watchLoginFetchRequested(),
    watchLoginFacebookFetchRequested(),
    watchLoginFetchSucceeded(),
    watchLogout(),
]
