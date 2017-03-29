import { AsyncStorage } from 'react-native';

export default class storage {
    storeUserLogin(login: Object): Promise<any> {
        return AsyncStorage.setItem('userLoginKey', JSON.stringify(login));
    }

    getUserLogin(): Promise<any> {
        return AsyncStorage.getItem('userLoginKey').then((item) => {
            return JSON.parse(item);
        });
    }
}
