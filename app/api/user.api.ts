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

    public loginFacebook(accesstoken: string): AxiosPromise {
        return api.post('/user/loginFacebook', querystring.stringify({
            accesstoken,
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
}

export default new userAPI();
