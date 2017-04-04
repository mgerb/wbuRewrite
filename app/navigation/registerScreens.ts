import { Navigation } from 'react-native-navigation';
import { Store } from 'redux';

import Dashboard from '../pages/Dashboard';
import CreateUser from '../pages/CreateUser';
import Login from '../pages/Login';
import RightDrawer from '../components/RightDrawer';
import LeftDrawer from '../components/LeftDrawer';
import CreateGroup from '../pages/CreateGroup';
import InviteUser from '../pages/InviteUser';

// register all screens of the app (including internal ones)
export default function registerScreens(store: Store<any>, Provider: any) {
  Navigation.registerComponent('Dashboard', () => Dashboard, store, Provider);
  Navigation.registerComponent('RightDrawer', () => RightDrawer,  store, Provider);
  Navigation.registerComponent('LeftDrawer', () => LeftDrawer, store, Provider);
  Navigation.registerComponent('CreateUser', () => CreateUser);
  Navigation.registerComponent('Login', () => Login, store, Provider);
  Navigation.registerComponent('CreateGroup', () => CreateGroup);
  Navigation.registerComponent('InviteUser', () => InviteUser, store, Provider);
}
