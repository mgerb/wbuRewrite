import { AsyncStorage } from 'react-native';
import { UserStateType } from '../redux/reducers/user';

class storage {

    // store user login information
    storeUserLogin(login: UserStateType): Promise<any> {
        return AsyncStorage.setItem('userLoginKey', JSON.stringify(login));
    }

    // get user login information
    getUserLogin(): Promise<UserStateType> {
        return AsyncStorage.getItem('userLoginKey').then((item) => {
            return JSON.parse(item);
        });
    }

    removeLogin(): Promise<any> {
        return AsyncStorage.removeItem('userLoginKey');
    }
}

export default new storage();
