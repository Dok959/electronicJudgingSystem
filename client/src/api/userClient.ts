import { HTTPError } from 'ky';
import api from './kyClient';
import { ICustomPropertyCreateUser, ISelectUser } from '@/types/user/';

export class userClient {
  static createUser = async (data: ICustomPropertyCreateUser) => {
    console.log(data);
    try {
      const result: boolean = await api
        .post('auth/registration', {
          json: { data },
        })
        .json();
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      if (error instanceof HTTPError) {
        const errorJson = await error.response.json();
        console.log(errorJson);
      } else if (error instanceof Error) {
        console.log(error.message);
      }
    }
    return false;
  };

  static getUsers = async (args: any = {}): Promise<ISelectUser[]> => {
    try {
      const result: ISelectUser[] = await api
        .get('user', {
          headers: {
            ...args,
          },
        })
        .json();

      return result;
    } catch (error) {
      console.log(error);
      if (error instanceof HTTPError) {
        const errorJson = await error.response.json();
        console.log(errorJson);
      } else if (error instanceof Error) {
        console.log(error.message);
      }
      return [];
    }
  };
}
