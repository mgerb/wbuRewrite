import { createStore } from 'redux';

import reducers from './reducers';

//create the new store with default state as an empty object
export const store = createStore(reducers);
