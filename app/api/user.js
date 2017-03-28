// @flow

import api from './api';
import querystring from 'querystring';

export default class user {

    createUser(email: string, password: string, firstName: string, lastName: string) {
        return api.post('/user/createUser', querystring.stringify({
            email,
            password,
            firstName,
            lastName,
        }));
    }

    login(email: string, password: string) {
        return api.post('/user/login', querystring.stringify({
            email,
            password,
        }));
    }

    loginFacebook(accesstoken: string) {
        return api.post('/user/loginFacebook', querystring.stringify({
            accesstoken,
        }));
    }

    searchUserByName(name: string) {
        return api.get(`/user/searchUserByName/${name}`);
    }

    refreshJWT() {
        return api.get('/user/refreshJWT');
    }

    updateFCMToken(token: string) {
        return api.post('/user/updateFCMToken', querystring.stringify({
            token,
        }));
    }
}
