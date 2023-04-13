import { HTTPError } from 'ky';
import api from './kyClient';
import { IPartisipants, ISelectAthlete } from '@/types/athlete';

export class partisipantClient {
  static getAllRegisteredPartisipants = async (
    args: any = {},
  ): Promise<IPartisipants[]> => {
    try {
      const result: [] = await api
        .get('partisipant/registered', {
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

  // TODO
  static getAllOnRegisteredPartisipants = async (
    args: any = {},
  ): Promise<ISelectAthlete[]> => {
    try {
      const result: [] = await api
        .get('partisipant/onRegistered', {
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

  static insertPartisipants = async (data: any): Promise<boolean> => {
    try {
      await api
        .post('partisipant/insert', {
          json: {
            data,
          },
        })
        .json();

      return true;
    } catch (error) {
      console.log(error);
      if (error instanceof HTTPError) {
        const errorJson = await error.response.json();
        console.log(errorJson);
      } else if (error instanceof Error) {
        console.log(error.message);
      }
      return false;
    }
  };
}
