import { delay } from 'redux-saga';
import { put, takeEvery } from 'redux-saga/effects';

import * as types from '../constants';
import * as appActions from '../actions/app';

function* fetchLogin() {
  yield delay(2000);
  yield put(appActions.login());
}

function* watchFetchLogin() {
  yield takeEvery(types.FETCH_LOGIN, fetchLogin);
}

export default function* rootSaga() {
  yield [
    watchFetchLogin()
  ];
}
