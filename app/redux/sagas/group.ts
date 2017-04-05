import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';

import { GroupStateType } from '../reducers/group';
import groupAPI from '../../api/group.api';
import types from '../constants';
import groupActions from '../actions/group';
import storage from '../../utils/storage';

import { GroupType } from '../reducers/group';

// get current state if needed in sagas
const getGroupState = (state: any): GroupStateType  => {
    return state.group
};

function* getUserGroupsFetchRequested(): any {
    try {
        // set user groups from storage before fetching from api
        const storedGroups: Array<GroupType> = yield call(storage.getGroups);
        if (!!storedGroups) {
            yield put(groupActions.getUserGroupsFetchSucceeded(storedGroups));
        }

        // get groups from api
        const response = yield call(groupAPI.getUserGroups);
        yield put(groupActions.getUserGroupsFetchSucceeded(response.data));

        // store groups in storage
        yield call(storage.storeGroups, response.data);

        // get the current state
        const state = yield select(getGroupState);

        // set the selected group if not selected yet
        if (!state.selectedGroup.id && response.data.length > 0) {
            yield put(groupActions.setSelectedGroup(response.data[0]));
        }
    } catch (error) {
        yield put(groupActions.getUserGroupsFetchFailed())
    }
}

// get group users every time we set a new selected group
function* getGroupUsersFetchRequested(): any {
    try {
        // get the current state
        const state = yield select(getGroupState);

        const response = yield call(groupAPI.getGroupUsers, state.selectedGroup.id);
        yield put(groupActions.getGroupUsersFetchSucceeded(response.data));
    } catch (error) {
        yield put(groupActions.getGroupUsersFetchFailed());
    }
}

// WATCHES -------------------
function* watchGetUserGroupsFetchRequested() {
    yield takeLatest(types.GET_USER_GROUPS_FETCH_REQUESTED, getUserGroupsFetchRequested);
    yield takeEvery(types.SET_SELECTED_GROUP, getGroupUsersFetchRequested);
}

export default [
    watchGetUserGroupsFetchRequested(),
]
