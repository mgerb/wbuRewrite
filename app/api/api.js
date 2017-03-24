import axios from 'axios';

const serverURL = 'http://192.168.1.6:8080';

let api = axios.create();
api.defaults.baseURL = serverURL;
api.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export function setAuthorizationHeader(jwt) {
  api.defaults.headers.common['Authorization'] = jwt;
}

export function resetAuthorizationHeader() {
  api.defaults.headers.common['Authorization'] = '';
}

export default api;
