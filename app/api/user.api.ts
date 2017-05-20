import { AxiosPromise } from 'axios';
import api from './api';
import querystring from 'query-string';

class userAPI {

    public createUser(email: string, password: string, firstName: string, lastName: string): AxiosPromise {
        return api.post('/user/createUser', querystring.stringify({
            email,
            password,
            firstName,
            lastName,
        }));
    }

    public login(email: string, password: string): AxiosPromise {
        return api.post('/user/login', querystring.stringify({
            email,
            password,
        }));
    }

    public loginFacebook(accessToken: string): AxiosPromise {
        return api.post('/user/loginFacebook', querystring.stringify({
            accessToken,
        }));
    }

    public searchUserByName(name: string): AxiosPromise {
        return api.get(`/user/searchUserByName/${name}`);
    }

    public refreshJWT(): AxiosPromise {
        return api.get('/user/refreshJWT');
    }

    public updateFCMToken(token: string): AxiosPromise {
        return api.post('/user/updateFCMToken', querystring.stringify({
            token,
        }));
    }

    public toggleNotifications(toggle: string): AxiosPromise {
        return api.post('/user/toggleNotifications', querystring.stringify({
            toggle,
        }));
    }

    public getUserSettings(): AxiosPromise {
        return api.get('/user/getUserSettings');
    }

    public removeFCMToken(): AxiosPromise {
        return api.post('/user/removeFCMToken');
    }

    public storeUserFeedback(feedback: string): AxiosPromise {
        return api.post('/user/storeUserFeedback', querystring.stringify({
            feedback,
        }));
    }
}

export default new userAPI();
