import { HTTPError } from 'ky';
import api from './kyClient';
import { IRanks } from '@/types';

export class rankClient {
  static getRanks = async (): Promise<IRanks[]> => {
    try {
      const result: IRanks[] = await api.get(`rank/`, {}).json();
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
