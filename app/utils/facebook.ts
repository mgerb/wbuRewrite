import { AccessToken, LoginManager } from 'react-native-fbsdk';

const readPermissions = ['user_friends', 'email', 'public_profile'];

class facebook {
    public login(): Promise<any> {
        // Attempt a login using the Facebook login dialog asking for default permissions.
        return LoginManager.logInWithReadPermissions(readPermissions).then(
            (result: any) => {
                if (result.isCancelled) {
                    // handle login cancelled - probably just do nothing
                } else {
                    return AccessToken.getCurrentAccessToken().then(
                        (data: any) => {
                            return data.accessToken.toString();
                        },
                    );
                }
            },
            (/*error: any*/) => {
                //alert('Login fail with error: ' + error);
            },
        );
    }

    public logout(): void {
        LoginManager.logOut();
    }
}

export default new facebook();
