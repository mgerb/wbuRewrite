import types from '../constants';

export interface GroupStateType {

}

const defaultState: GroupStateType = {

};

function group(state: GroupStateType = defaultState, action: any): any {
    switch (action.type) {
        case types.CREATE_GROUP_FETCH_REQUESTED:
            return state;
    }

    return state;
}

export default group;
