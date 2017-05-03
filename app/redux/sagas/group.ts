import { delay } from 'redux-saga';
import { call, put, takeEvery, throttle, select } from 'redux-saga/effects';

import { GroupStateType } from '../reducers/group';
import groupAPI from '../../api/group.api';
import types from '../constants';
import groupActions from '../actions/group';
import storage from '../../utils/storage';
import { MessageRealm } from '../../utils/realm';

import { GroupType } from '../reducers/group';
import { UserType } from '../reducers/user';

// get current state if needed in sagas
const getGroupState = (state: any): GroupStateType  => {
    return state.group;
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
        yield put(groupActions.getUserGroupsFetchFailed());
    }

    // get the current state
    const state: GroupStateType = yield select(getGroupState);

    // set the selected group if not selected yet
    if (!state.selectedGroup.id && state.groups.length > 0) {
        yield put(groupActions.setSelectedGroup(state.groups[0]));
    }
}

function* setSelectedGroup(): any {
    yield put(groupActions.getGroupUsersFetchRequested());
    yield put(groupActions.getGroupMessagesFromStorage());
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

function* getGroupMessagesFromStorage(): any {
    // need to delay so we don't block the first action (realm currently blocks and loading icon won't show)
    yield delay(0);
    // get groupID from selected group if not passed in
    const state: GroupStateType = yield select(getGroupState);
    let groupID = state.selectedGroup.id;

    const storedMessages = yield MessageRealm.getMessages(groupID as number);
    yield put(groupActions.setGroupMessages(storedMessages));
    
    // fetch messages from server
    yield put(groupActions.getGroupMessagesFetchRequested(groupID));
}

function* getGroupMessagesFetchRequested(action: any): any {
    try {
        // fetch new messages from server based on last message timestamp
        const response = yield call(groupAPI.getMessages, action.groupID, MessageRealm.getLastMessageDate(action.groupID));
        yield put(groupActions.getGroupMessagesFetchSucceeded());

        // store new message
        if (response.data.length > 0) {
            yield MessageRealm.storeMessages(response.data);
            const storedMessages = yield MessageRealm.getMessages(action.groupID);
            yield put(groupActions.setGroupMessages(storedMessages));
        }

    } catch(error) {
        yield put(groupActions.getGroupMessagesFetchFailed());
    }
}

export default function* watches() {
    yield throttle(2000, types.GET_USER_GROUPS_FETCH_REQUESTED, getUserGroupsFetchRequested);
    yield throttle(2000, types.GET_GROUP_MESSAGES_FROM_STORAGE, getGroupMessagesFromStorage);
    yield throttle(2000, types.GET_GROUP_MESSAGES_FETCH_REQUESTED, getGroupMessagesFetchRequested);
    yield throttle(2000, types.GET_GROUP_USERS_FETCH_REQUESTED, getGroupUsersFetchRequested);
    yield takeEvery(types.SET_SELECTED_GROUP, setSelectedGroup);
}
