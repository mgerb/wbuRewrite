import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { setAuthorizationHeader, resetAuthorizationHeader } from '../../api/api';
import userAPI from '../../api/user.api';
import types from '../constants';
import userActions from '../actions/user';
import groupActions from '../actions/group';
import storage from '../../utils/storage';
import { UserType } from '../reducers/user';
import navigation from '../../navigation';
import fcm from '../../utils/fcm';
import facebook from '../../utils/facebook';

function* fetchLoginRequested(action: UserType): any {
    try {
        const response = yield call(userAPI.login, action.email, action.password);
        yield call(storage.storeUserState, response.data);
        yield put(userActions.loginFetchSucceeded(response.data));
    } catch (error) {
        yield put(userActions.loginFetchFailed());
    }
}

function* fetchFacebookLoginRequested(action: UserType): any {
    try {
        const response = yield call(userAPI.loginFacebook, action.facebookAccessToken);
        yield call(storage.storeUserState, response.data);
        yield put(userActions.loginFetchSucceeded(response.data));
    } catch (error) {
        yield put(userActions.loginFetchFailed());
    }
}

// set the jwt auth header every time a login succeeds
function* loginFetchSucceeded(action: any): any {
    // get fcm token and send to server
    yield fcm.getFCMToken();
    yield setAuthorizationHeader(action.jwt);
    yield put(groupActions.getUserGroupsFetchRequested());
}

// reset storage and navigate to login screen
function* logout(): any {
    try {
        // need to reset user state ASAP because we check if user is logged in when calling this
        yield facebook.logout();
        yield put(userActions.resetUserState());
        yield put(groupActions.resetGroupState());
        yield navigation.Login();
        yield call(storage.removeAllKeys);
        yield call(userAPI.removeFCMToken);
        yield resetAuthorizationHeader();
    } catch(error) {
        console.log(error);
    }
}

function* fetchRefreshJWT(): any {
    try {
        const response = yield call(userAPI.refreshJWT);
        yield put(userActions.refreshJWTFetchSucceeded(response.data.jwt, response.data.lastRefreshTime));
    } catch(error) {
        yield put(userActions.refreshJWTFetchFailed());
    }
}

export default function* watches() {
    yield takeLatest(types.LOGIN_FETCH_REQUESTED, fetchLoginRequested);
    yield takeLatest(types.LOGIN_FACEBOOK_FETCH_REQUESTED, fetchFacebookLoginRequested);
    yield takeEvery(types.LOGIN_FETCH_SUCCEEDED, loginFetchSucceeded);
    yield takeEvery(types.LOGOUT, logout);
    yield takeEvery(types.REFRESH_JWT_FETCH_REQUESTED, fetchRefreshJWT);
}
