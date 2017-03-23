import { Navigation } from 'react-native-navigation';

class n {

    startDashboard() {
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
}

export default new n();