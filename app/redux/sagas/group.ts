import { call, put, takeLatest } from 'redux-saga/effects';

import groupAPI from '../../api/group.api';
import types from '../constants';
import groupActions from '../actions/group';
//import { GroupType } from '../reducers/group';

function* getUserGroupsFetchRequested(): any {
    try {
        const response = yield call(groupAPI.getUserGroups);
        yield put(groupActions.getUserGroupsFetchSucceeded(response.data));
    } catch (error) {
        yield put(groupActions.getUserGroupsFetchFailed())
    }
}

// WATCHES -------------------
function* watchGetUserGroupsFetchRequested() {
    yield takeLatest(types.GET_USER_GROUPS_FETCH_REQUESTED, getUserGroupsFetchRequested);
}

export default [
    watchGetUserGroupsFetchRequested(),
]
