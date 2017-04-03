import { AsyncStorage } from 'react-native';
import { UserStateType } from '../redux/reducers/user';
import { GroupType } from '../redux/reducers/group';

const USER_STATE_KEY = "USER_STATE_KEY";
const GROUPS_KEY = "GROUPS_KEY";

class storage {

    // store user login information
    storeUserState(userState: UserStateType): Promise<any> {
        return AsyncStorage.setItem(USER_STATE_KEY, JSON.stringify(userState));
    }

    // get user login information
    getUserState(): Promise<UserStateType> {
        return AsyncStorage.getItem(USER_STATE_KEY).then((item) => {
            return JSON.parse(item);
        });
    }

    // store user group array
    storeGroups(groups: Array<GroupType>): Promise<any> {
        return AsyncStorage.setItem(GROUPS_KEY, JSON.stringify(groups));
    }

    // get groups from storage
    getGroups(): Promise<Array<GroupType>> {
        return AsyncStorage.getItem(GROUPS_KEY).then((item) => {
            return JSON.parse(item);
        });
    }

    // remove all of our keys
    public removeAllKeys(): Promise<any> {
        return AsyncStorage.multiRemove([USER_STATE_KEY, GROUPS_KEY]);
    }
}

export default new storage();
