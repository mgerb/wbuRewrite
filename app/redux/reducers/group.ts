import types from '../constants';

export interface GroupType  {
    id?: number,
    name?: string,
    ownerID?: number,
    ownerEmail?: string,
    ownerName?: string,
    userCount?: number,
    locked?: boolean,
    public?: boolean,
}

export interface GroupStateType {

}

const defaultState: GroupStateType = {

};

function group(state: GroupStateType = defaultState, action: any): any {
    switch (action.type) {
        case types.GET_GROUP_USERS_FETCH_REQUESTED:
            return state;
    }

    return state;
}

export default group;
