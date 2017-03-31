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

interface actionMapType extends ActionCreatorsMapObject {
    test: any,
}

const actionMap: actionMapType = {
    test,
};

export default actionMap;
