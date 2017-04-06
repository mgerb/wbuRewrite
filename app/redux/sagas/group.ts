import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';

import { GroupStateType } from '../reducers/group';
import groupAPI from '../../api/group.api';
import types from '../constants';
import groupActions from '../actions/group';
import storage from '../../utils/storage';

import { GroupType } from '../reducers/group';
import { UserType } from '../reducers/user';

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

    } catch (error) {
        yield put(groupActions.getUserGroupsFetchFailed())
    }

    // get the current state
    const state: GroupStateType = yield select(getGroupState);

    // set the selected group if not selected yet
    if (!state.selectedGroup.id && state.groups.length > 0) {
        yield put(groupActions.setSelectedGroup(state.groups[0]));
    }
}

// get group users every time we set a new selected group
function* getGroupUsersFetchRequested(): any {
    try {
        // get the current state
        const state: GroupStateType = yield select(getGroupState);

        // set group users from storage before fetching from server
        let storedGroupUsers: Array<UserType> = yield call(storage.getGroupUsers, state.selectedGroup.id);
        if (!storedGroupUsers) {
            storedGroupUsers = [];
        }

        yield put(groupActions.getGroupUsersFetchSucceeded(storedGroupUsers));

        // get group users from server
        const response = yield call(groupAPI.getGroupUsers, state.selectedGroup.id);
        yield put(groupActions.getGroupUsersFetchSucceeded(response.data));

        // store group users in local storage
        yield call(storage.storeGroupUsers, state.selectedGroup.id, response.data);
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
