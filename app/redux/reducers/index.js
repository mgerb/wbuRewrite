//just using one reducer - use combineReducers from redux to modularize things
import { combineReducers } from 'redux';

import group from './group';
import user from './user';

const rootReducer = combineReducers({
    group,
    user,
});

export default rootReducer;
