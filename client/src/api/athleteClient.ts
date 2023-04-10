import { HTTPError } from 'ky';
import api from './kyClient';
import { ICustomPropertyCreateAthlete, ISelectAthlete } from '@/types/athlete';

export class athleteClient {
  static createAthlete = async (data: ICustomPropertyCreateAthlete) => {
    try {
      const result: boolean = await api
        .post('athlete/create', {
          json: { data },
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
    }
    return false;
  };

  static getAthletes = async (args: any = {}): Promise<ISelectAthlete[]> => {
    try {
      const result: ISelectAthlete[] = await api
        .get('athlete', {
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
