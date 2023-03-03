import { HTTPError } from 'ky';
import api from './kyClient';
import { ICreateEvent, IEventAndSettings } from '@/types';

export class eventClient {
  static getEvents = async (
    ranks: number[] = [],
    cursorInit: number = 0,
  ): Promise<IEventAndSettings[]> => {
    try {
      const result: IEventAndSettings[] = await api
        .post('event/', {
          json: { masRanksId: ranks, cursorInit: cursorInit },
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

  static create = async (event: ICreateEvent): Promise<IEventAndSettings[]> => {
    try {
      const result: IEventAndSettings[] = await api
        .post('event/create', {
          json: { event },
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
