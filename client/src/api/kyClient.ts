import ky from 'ky';
import { IHeadersAuthDto } from './headers.dto';

let auth: IHeadersAuthDto = {};
try {
  auth = JSON.parse(localStorage.getItem(`auth`) || '');
} catch (error) {
  auth.access_token = '';
  auth.refresh_token = '';
}

const api = ky.create({
  prefixUrl: process.env.REACT_APP_SERVER_URL,
  headers: {
    authorization: auth.access_token,
    refresh: auth.refresh_token,
  },
});

export default api;
