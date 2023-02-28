import { HTTPError } from 'ky';
import api from './kyClient';
import { IEventAndSettings } from '@/types';

export class eventClient {
  static getEvents = async (
    ranks: number[] = [],
  ): Promise<IEventAndSettings[]> => {
    try {
      const result: IEventAndSettings[] = await api
        .post('event/', {
          json: { masRanksId: ranks },
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
    return [];
  };
}
