import api from './kyClient';
import { Event } from '@/types/eventsList';
import { HTTPError } from 'ky';

export class eventClient {
  static getEvents = async (): Promise<Event[]> => {
    try {
      const result: Event[] = await api.get('event/', {}).json();
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
