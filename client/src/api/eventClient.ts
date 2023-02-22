import api from './kyClient';
import { EventAndSettings } from '@/types';
import { HTTPError } from 'ky';

export class eventClient {
  static getEvents = async (
    ranks: number[] = [],
  ): Promise<EventAndSettings[]> => {
    console.log(ranks);
    try {
      const result: EventAndSettings[] = await api
        .post('event/', {
          json: { masRanksid: ranks },
        })
        .json();
      console.log(result);
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
