import axios, { AxiosResponse } from 'axios';
import store from '../redux/store';
import userActions from '../redux/actions/user';

const serverURL = __DEV__ ? 'http://192.168.1.6:8080' : "https://prod.wherebaryou.com";
//const serverURL = "https://prod.wherebaryou.com";

let api = axios.create();
api.defaults.baseURL = serverURL;
api.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// response interceptors
api.interceptors.response.use((config: AxiosResponse) => {
    return config;
}, (error: any) => {
    // if code is unauthorized (401) then logout if already logged in
    if (error.response.status === 401 && store.getState().user.loggedIn) {
      store.dispatch(userActions.logout());
    }

    return Promise.reject(error);
});

export function setAuthorizationHeader(jwt: string): void {
    api.defaults.headers.common['Authorization'] = jwt;
}

export function resetAuthorizationHeader(): void {
    api.defaults.headers.common['Authorization'] = '';
}

export default api;
