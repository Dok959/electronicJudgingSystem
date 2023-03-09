import { HTTPError } from 'ky';
import api from './kyClient';

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
}
