// @flow
import navigation from './navigation';
import registerScreens from './navigation/registerScreens';

import { Provider } from 'react-redux';
import store from './redux/store';

registerScreens(store, Provider);
navigation.startDashboard();
