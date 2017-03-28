// @flow

import { Navigation } from 'react-native-navigation';

import Dashboard from '../pages/Dashboard';
import CreateUser from '../pages/CreateUser';
import Login from '../pages/Login';
import RightDrawer from '../components/RightDrawer';
import LeftDrawer from '../components/LeftDrawer';

// register all screens of the app (including internal ones)
export default function registerScreens(store, Provider) {
  Navigation.registerComponent('Dashboard', () => Dashboard, store, Provider);
  Navigation.registerComponent('RightDrawer', () => RightDrawer,  store, Provider);
  Navigation.registerComponent('LeftDrawer', () => LeftDrawer, store, Provider);
  Navigation.registerComponent('CreateUser', () => CreateUser, store, Provider);
  Navigation.registerComponent('Login', () => Login, store, Provider);
}
