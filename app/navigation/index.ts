import { Navigation } from 'react-native-navigation';
import colors from '../style/colors';
import { GroupType } from '../redux/reducers/group';

export interface ClosableModal {
    onNavigatorEvent(event: any): void;
}

class nav {

    public NavStyle: any = {
        navBarBackgroundColor: colors.primary,
        navBarTextColor: colors.white,
        navBarButtonColor: colors.white,
    };

    Dashboard(): void {
        Navigation.startSingleScreenApp({
            screen: {
                screen: 'Dashboard',
                navigatorStyle: {
                    navBarHidden: true,
                },
            },
            drawer: {
                left: {
                    screen: 'LeftDrawer',
                },
                right: {
                    screen: 'RightDrawer',
                }
            },
            animationType: 'slide-down',
        });
    }

    Login(): void {
        Navigation.startSingleScreenApp({
            screen: {
                screen: 'Login',
                title: 'Login',
            },
            animationType: 'slide-down',
        });
    }

    GroupSegue(): void {
        Navigation.showModal({
            screen: "GroupSegue",
            title: "Groups",
            navigatorButtons: {
                leftButtons: [{
                    title: "Close",
                    id: "close",
                }],
            },
        });
    }

    GroupInvites(): void {
        Navigation.showModal({
            screen: "GroupInvites",
            title: "Group Invites",
            navigatorButtons: {
                leftButtons: [{
                    title: "Close",
                    id: "close",
                }],
            },
        });
    }

    InviteUser(): void {
        Navigation.showModal({
            screen: "InviteUser",
            title: "Invite User",
            navigatorButtons: {
                leftButtons: [{
                    title: "Close",
                    id: "close",
                }],
            },
        });
    }

    Settings(): void {
        Navigation.showModal({
            screen: "Settings",
            //title: "Settings",
            navigatorButtons: {
                leftButtons: [{
                    title: "Close",
                    id: "close",
                }],
            },
        });
    }

    MapView(title: string): void {
        Navigation.showModal({
            screen: "MapView",
            title: title,
            navigatorButtons: {
                leftButtons: [{
                    title: "Close",
                    id: "close",
                }],
            },
        });
    }

    GroupInfo(group: GroupType, settingsPage?: boolean): void {
        Navigation.showModal({
            screen: "GroupInfo",
            title: "Group Info",
            passProps: {
                group,
                settingsPage,
            },
            navigatorButtons: {
                leftButtons: [{
                    title: "Close",
                    id: "close",
                }],
            },
        });
    }
}

export default new nav();
