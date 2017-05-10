//just using one reducer - use combineReducers from redux to modularize things
import { combineReducers} from 'redux';

import geo from './geo';
import group from './group';
import user from './user';

const rootReducer: any = combineReducers({
    geo,
    group,
    user,
});

export default rootReducer;
