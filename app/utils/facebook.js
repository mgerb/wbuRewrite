// @flow
import { AccessToken, LoginManager } from 'react-native-fbsdk';

const readPermissions = ['user_friends', 'email', 'public_profile'];

class facebook {
    login(): Promise<any> {
        // Attempt a login using the Facebook login dialog asking for default permissions.
        return LoginManager.logInWithReadPermissions(readPermissions).then(
            (result: any) => {
                if (result.isCancelled) {
                    alert('Login cancelled');
                } else {
                    return AccessToken.getCurrentAccessToken().then(
                        (data: any) => {
                            return data.accessToken.toString();
                        }
                    );
                }
            },
            (error: any) => {
                alert('Login fail with error: ' + error);
            }
        );
    }
}

export default new facebook();
