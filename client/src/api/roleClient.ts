import { HTTPError } from 'ky';
import api from './kyClient';
import { IRoles } from '@/types';

export class roleClient {
  static getRole = async (): Promise<IRoles | null> => {
    try {
      const auth = JSON.parse(localStorage.getItem(`auth`) || '');
      const result: IRoles = await api
        .get('role/user', {
          headers: {
            authorization: auth.access_token,
            refresh: auth.refresh_token,
          },
        })
        .json();

      return result;
    } catch (error) {
      if (error instanceof HTTPError) {
        const errorJson = await error.response.json();
        console.log(errorJson);
      } else if (error instanceof Error) {
        console.log(error.message);
      }
    }
    return null;
  };
}
