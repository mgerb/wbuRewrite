// @flow

import { delay } from 'redux-saga';
import { put, takeEvery } from 'redux-saga/effects';

import * as types from '../constants';
import * as userActions from '../actions/user';

function* fetchLogin() {
  yield delay(2000);
  yield put(userActions.login());
}

function* watchFetchLogin() {
  yield takeEvery(types.LOGIN_FETCH_REQUESTED, fetchLogin);
}

export default function* rootSaga() {
  yield [
    watchFetchLogin()
  ];
}
