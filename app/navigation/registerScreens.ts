import { Navigation } from 'react-native-navigation';
import { Store } from 'redux';
import CodePush from 'react-native-code-push';

import Dashboard from '../pages/Dashboard';
import CreateUser from '../pages/CreateUser';
import Login from '../pages/Login';
import RightDrawer from '../components/RightDrawer';
import LeftDrawer from '../components/LeftDrawer';
import CreateGroup from '../pages/CreateGroup';
import InviteUser from '../pages/InviteUser';
import GroupInvites from '../pages/GroupInvites';
import GroupSegue from '../pages/GroupSegue';
import GroupSearch from '../pages/GroupSearch';
import GroupInfo from '../pages/GroupInfo';
import Settings from '../pages/Settings';
import MapView from '../pages/MapView';
import Feedback from '../pages/Feedback';

// register all screens of the app (including internal ones)
export default function registerScreens(store: Store<any>, Provider: any) {
  Navigation.registerComponent('Dashboard', () => CodePush(Dashboard as any), store, Provider);
  Navigation.registerComponent('RightDrawer', () => RightDrawer,  store, Provider);
  Navigation.registerComponent('LeftDrawer', () => LeftDrawer, store, Provider);
  Navigation.registerComponent('CreateUser', () => CreateUser);
  Navigation.registerComponent('Login', () => Login, store, Provider);
  Navigation.registerComponent('CreateGroup', () => CreateGroup);
  Navigation.registerComponent('InviteUser', () => InviteUser, store, Provider);
  Navigation.registerComponent('GroupInvites', () => GroupInvites);
  Navigation.registerComponent('GroupSegue', () => GroupSegue);
  Navigation.registerComponent('GroupSearch', () => GroupSearch);
  Navigation.registerComponent('GroupInfo', () => GroupInfo);
  Navigation.registerComponent('Settings', () => Settings, store, Provider);
  Navigation.registerComponent('MapView', () => MapView, store, Provider);
  Navigation.registerComponent('Feedback', () => Feedback, store, Provider);
}
