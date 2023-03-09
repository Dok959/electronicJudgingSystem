import { HTTPError } from 'ky';
import api from './kyClient';
import { setAuth, setGrant } from '../context/auth';
import { roleClient } from '.';
import { SyntheticEvent } from 'react';

export class authClient {
  static setError = async (error: SyntheticEvent | any) => {
    if (error instanceof HTTPError) {
      const errorJson = await error.response.json();
      console.log(errorJson);
      return errorJson;
    } else if (error instanceof Error) {
      console.log(error.message);
      return error;
    }
  };

  static setAutorization = (isEntrance: boolean, role: boolean) => {
    setAuth(isEntrance);
    setGrant(role);
    if (isEntrance === false) {
      localStorage.setItem(`auth`, JSON.stringify(null));
    }
  };

  static login = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await api
        .post('auth/login', {
          json: { email, password },
        })
        .json();

      localStorage.setItem(`auth`, JSON.stringify(result));

      const role = await roleClient.getUserGrant();
      this.setAutorization(true, role);

      return true;
    } catch (error) {
      this.setError(error);
      return false;
    }
  };

  static reLogin = async (): Promise<boolean> => {
    try {
      const auth = JSON.parse(localStorage.getItem(`auth`) || '');
      const result = await api
        .post('auth/refresh', {
          json: { ...auth },
        })
        .json();

      localStorage.setItem(`auth`, JSON.stringify(result));
      const role = await roleClient.getUserGrant();
      this.setAutorization(true, role);

      return true;
    } catch (error) {
      this.setError(error);
      return false;
    }
  };
}
