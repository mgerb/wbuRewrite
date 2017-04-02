import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { setAuthorizationHeader, resetAuthorizationHeader } from '../../api/api';
import userAPI from '../../api/user.api';
import types from '../constants';
import userActions from '../actions/user';
import storage from '../../utils/storage';
import { UserType } from '../reducers/user';

function* fetchLoginRequested(action: UserType) {
    try {
        const response = yield call(userAPI.login, action.email, action.password)
        yield call(storage.storeUserState, response.data);
        yield put(userActions.loginFetchSucceeded(response.data));
    } catch (error) {
        yield put(userActions.loginFetchFailed());
    }
}

function* fetchFacebookLoginRequested(action: UserType) {
    try {
        const response = yield call(userAPI.loginFacebook, action.facebookAccessToken)
        yield call(storage.storeUserState, response.data);
        yield put(userActions.loginFetchSucceeded(response.data));
    } catch (error) {
        yield put(userActions.loginFetchFailed());
    }
}

// set the jwt auth header every time a login succeeds
function* loginFetchSucceeded(action: any) {
    yield setAuthorizationHeader(action.jwt);
}

function* resetUserState() {
    yield call(storage.removeUserState);
    yield resetAuthorizationHeader();
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

function* watchResetUserState() {
    yield takeEvery(types.RESET_USER_STATE, resetUserState);
}

export default [
    watchLoginFetchRequested(),
    watchLoginFacebookFetchRequested(),
    watchLoginFetchSucceeded(),
    watchResetUserState(),
]
