import { HTTPError } from 'ky';
import api from './kyClient';
import {
  ICreateSettingsEvent,
  ICustomPropertyCreateEvent,
  IEventAndSettings,
} from '@/types';

export class eventClient {
  static getEvents = async (
    ranks: number[] = [],
    cursorInit: number = 0,
  ): Promise<IEventAndSettings[]> => {
    console.log(ranks, cursorInit);
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

  static create = async (
    event: ICustomPropertyCreateEvent,
  ): Promise<IEventAndSettings[]> => {
    try {
      const masSetting: ICreateSettingsEvent[] = [];
      event.masPartisipantsIndividualRanks.map((item: number) => {
        return masSetting.push({
          typeId: event.typeIndividual,
          rankId: item,
        });
      });

      event.masPartisipantsGroupRanks.map((item: number) => {
        return masSetting.push({
          typeId: event.typeGroup,
          rankId: item,
        });
      });

      const result: IEventAndSettings[] = await api
        .post('event/create', {
          json: {
            title: event.title,
            startDateTime: event.startDateTime,
            duration: event.duration,
            SettingsEvent: masSetting,
          },
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
