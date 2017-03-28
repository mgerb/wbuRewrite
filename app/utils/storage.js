//@flow

import { AsyncStorage } from 'react-native';

export default class storage {
    storeUserLogin(login: Object) {
        return AsyncStorage.setItem('userLoginKey', JSON.stringify(login));
    }

    getUserLogin() {
        return AsyncStorage.getItem('userLoginKey').then((item) => {
            return JSON.parse(item);
        });
    }
}
