import api from './kyClient';
import { setAuth } from '../context/auth';
import { HTTPError } from 'ky';

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
      if (error instanceof HTTPError) {
        const errorJson = await error.response.json();
        console.log(errorJson);
        return;
      } else if (error instanceof Error) {
        console.log(error.message);
        return;
      }
    }
    return false;
  };
}
