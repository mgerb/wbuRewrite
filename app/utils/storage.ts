import { AsyncStorage } from 'react-native';
import { UserStateType } from '../redux/reducers/user';

class storage {

    // store user login information
    storeUserState(login: UserStateType): Promise<any> {
        return AsyncStorage.setItem('userStateKey', JSON.stringify(login));
    }

    // get user login information
    getUserState(): Promise<UserStateType> {
        return AsyncStorage.getItem('userStateKey').then((item) => {
            return JSON.parse(item);
        });
    }

    removeUserState(): Promise<any> {
        return AsyncStorage.removeItem('userStateKey');
    }
}

export default new storage();
