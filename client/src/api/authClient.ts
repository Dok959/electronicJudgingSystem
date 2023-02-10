import api from './kyClient';
import { setAuth } from '../context/auth';

export class authClient {
  static login = async (email: string, password: string) => {
    try {
      const result = await api
        .post('auth/login', {
          json: { email, password },
        })
        .json();
      console.log(result);

      setAuth(true);
      localStorage.setItem(`auth`, JSON.stringify(result));
      return true;
    } catch (error) {
      console.log(error);
    }
    return false;
  };
}
