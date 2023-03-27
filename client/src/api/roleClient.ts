import { HTTPError } from 'ky';
import api from './kyClient';
import { IRoles } from '@/types';

export class roleClient {
  static getUserGrant = async (): Promise<boolean> => {
    try {
      const result: boolean = await api.get('role/user', {}).json();
      return result;
    } catch (error) {
      if (error instanceof HTTPError) {
        const errorJson = await error.response.json();
        console.log(errorJson);
      } else if (error instanceof Error) {
        console.log(error.message);
      }
    }
    return false;
  };

  static getRoles = async (): Promise<IRoles[]> => {
    try {
      const result: IRoles[] = await api.get('role/', {}).json();
      return result;
    } catch (error) {
      if (error instanceof HTTPError) {
        const errorJson = await error.response.json();
        console.log(errorJson);
      } else if (error instanceof Error) {
        console.log(error.message);
      }
    }
    return [];
  };
}
