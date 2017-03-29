import axios from 'axios';

const serverURL = 'http://localhost:8080';

let api = axios.create();
api.defaults.baseURL = serverURL;
api.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export function setAuthorizationHeader(jwt: string): void {
  api.defaults.headers.common['Authorization'] = jwt;
}

export function resetAuthorizationHeader(): void {
  api.defaults.headers.common['Authorization'] = '';
}

export default api;
