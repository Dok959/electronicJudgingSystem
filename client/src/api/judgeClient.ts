import { HTTPError } from 'ky';
import api from './kyClient';
import { ICustomPropertyCreateAthlete, ISelectAthlete } from '@/types/athlete';
import { ISelectUser } from '@/types/user';

export class judgeClient {
  static getAllOnRegisteredJudge = async (
    args: any = {},
  ): Promise<ISelectUser[]> => {
    try {
      const result: [] = await api
        .get('judge/onRegistered', {
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

  static getAllRegisteredJudge = async (
    args: any = {},
  ): Promise<ISelectUser[]> => {
    try {
      const result: [] = await api
        .get('judge/registered', {
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
