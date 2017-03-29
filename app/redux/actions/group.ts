import { Action, ActionCreatorsMapObject } from 'redux';

interface test12 extends Action {
    t: string,
}

function test(t: string): test12 {
    return {
        type: "test",
        t,
    };
}

const actionMap: ActionCreatorsMapObject = {
    test,
};

export default actionMap;
