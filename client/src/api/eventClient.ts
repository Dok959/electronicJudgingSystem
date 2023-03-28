import { HTTPError } from 'ky';
import { redirect } from 'react-router-dom';
import api from './kyClient';
import {
  ICreateSettingsEvent,
  ICustomPropertyCreateEvent,
  ISelectEvent,
} from '@/types/event';
import { ILoadEventAndSettings } from '@/pages/Event/edit/dto';
import {
  ICustomPropertyUpdateEvent,
  IUpdateSettingsEvent,
} from '@/types/event/updateEvent';

export class eventClient {
  static getEvents = async (
    ranks: number[] = [],
    cursorInit: number = 0,
  ): Promise<ISelectEvent[]> => {
    try {
      const result: ISelectEvent[] = await api
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
  ): Promise<ISelectEvent[]> => {
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

      const result: ISelectEvent[] = await api
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

  static update = async (
    event: ICustomPropertyUpdateEvent,
  ): Promise<ISelectEvent[]> => {
    try {
      const masSetting: IUpdateSettingsEvent[] = [];
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

      const result: ISelectEvent[] = await api
        .post('event/update', {
          json: {
            id: event.id,
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

  static getEvent = async (
    id: number,
  ): Promise<ILoadEventAndSettings | null> => {
    try {
      const result: ILoadEventAndSettings = await api
        .get(`event/${id}`, {})
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
    redirect(`/event`);
    return null;
  };
}
