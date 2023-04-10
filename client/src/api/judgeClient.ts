import { HTTPError } from 'ky';
import api from './kyClient';
import { ICustomPropertyCreateAthlete, ISelectAthlete } from '@/types/athlete';

export class judgeClient {
  // : Promise<ISelectAthlete[]>
  static getAllJudge = async (args: any = {}): Promise<[]> => {
    try {
      const result: [] = await api
        .get('judge', {
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
