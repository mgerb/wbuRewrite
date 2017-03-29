import { Navigation } from 'react-native-navigation';

class nav {

    Dashboard(): void {
        Navigation.startSingleScreenApp({
            screen: {
                screen: 'Dashboard',
                navigatorStyle: {
                    navBarHidden: true
                }
            },
            drawer: {
                left: {
                    screen: 'LeftDrawer'
                },
                right: {
                    screen: 'RightDrawer'
                }
            },
            animationType: 'slide-down',
        });
    }

    CreateUser(): void {
        Navigation.startSingleScreenApp({
            screen: {
                screen: 'CreateUser',
                navigatorStyle: {
                    navBarHidden: true
                }
            },
            animationType: 'slide-down',
        });
    }

    Login(): void {
        Navigation.startSingleScreenApp({
            screen: {
                screen: 'Login',
                navigatorStyle: {
                    navBarHidden: true
                }
            },
            animationType: 'slide-down',
        });
    }
}

export default new nav();
