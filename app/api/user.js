import api from './api';
import querystring from 'querystring';

export default class user {

    createUser(email, password, firstName, lastName) {
        return api.post('/user/createUser', querystring.stringify({
            email,
            password,
            firstName,
            lastName,
        }));
    }

    login(email, password) {
        return api.post('/user/login', querystring.stringify({
            email,
            password,
        }));
    }

    loginFacebook(accesstoken) {
        return api.post('/user/loginFacebook', querystring.stringify({
            accesstoken,
        }));
    }

    searchUserByName(name) {
        return api.get(`/user/searchUserByName/${name}`);
    }

    refreshJWT() {
        return api.get('/user/refreshJWT');
    }

    updateFCMToken(token) {
        return api.post('/user/updateFCMToken', querystring.stringify({
            token,
        }));
    }
}
