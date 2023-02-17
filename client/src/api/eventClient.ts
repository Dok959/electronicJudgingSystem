import api from './kyClient';
import { EventAndSettings } from '@/types/eventsList';
import { HTTPError } from 'ky';

export class eventClient {
  static getEvents = async (): Promise<EventAndSettings[]> => {
    try {
      const result: EventAndSettings[] = await api.get('event/', {}).json();
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
