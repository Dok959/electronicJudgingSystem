import ky from 'ky';

// On https://my-site.com

const auth = JSON.parse(localStorage.getItem(`auth`) || '');

const api = ky.create({
  prefixUrl: process.env.REACT_APP_SERVER_URL,
  headers: {
    authorization: auth.access_token,
    refresh: auth.refresh_token,
  },
});

// const response = await api.get('users/123');
//=> 'https://example.com/api/users/123'

// const response = await api.get('/status', { prefixUrl: '' });
//=> 'https://my-site.com/status'
export default api;
