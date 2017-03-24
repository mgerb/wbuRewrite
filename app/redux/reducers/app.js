import * as types from '../constants';

const defaultState = {
    loggedIn: false,
};

function app(state = defaultState, action) {
    switch (action.type) {
        case types.LOGIN:
            return {...state, loggedIn: true};
    }

    return state;
}

export default app;
