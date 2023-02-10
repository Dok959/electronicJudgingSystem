import ky from 'ky';

// On https://my-site.com

const api = ky.create({ prefixUrl: process.env.REACT_APP_SERVER_URL });

// const response = await api.get('users/123');
//=> 'https://example.com/api/users/123'

// const response = await api.get('/status', { prefixUrl: '' });
//=> 'https://my-site.com/status'
export default api;
