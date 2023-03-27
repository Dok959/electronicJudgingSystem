import { HTTPError } from 'ky';
import api from './kyClient';
import { ICustomPropertyCreateUser } from '@/types';

export class userClient {
  static createUser = async (user: ICustomPropertyCreateUser) => {
    try {
      const result: boolean = await api
        .post('user/create', {
          json: { ...user },
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
    return false;
  };
}
