import { HTTPError } from 'ky';
import api from './kyClient';
import { ICustomPropertyCreateAthlete } from '@/types/athlete';

export class athleteClient {
  static createAthlete = async (data: ICustomPropertyCreateAthlete) => {
    console.log(data);
    try {
      const result: boolean = await api
        .post('athlete/create', {
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

  // : Promise<ISelectUser[]>
  static getAthletes = async (args: any = {}): Promise<[]> => {
    try {
      const result: [] = await api
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
