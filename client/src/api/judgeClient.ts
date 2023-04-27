import { HTTPError } from 'ky';
import api from './kyClient';
import { ISelectUser } from '@/types/user';
import { ISelectEvent } from '@/types/event';
import { IItem, IPlaces, IRanks } from '@/types';
import { IEntryPartisipant, IPlacesEvent } from '@/types/judging';

export class judgeClient {
  static getAllOnRegisteredJudge = async (
    args: any = {},
  ): Promise<ISelectUser[]> => {
    try {
      const result: [] = await api
        .get('judge/onRegistered', {
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

  static getAllRegisteredJudge = async (
    args: any = {},
  ): Promise<ISelectUser[]> => {
    try {
      const result: [] = await api
        .get('judge/registered', {
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

  static insertJudges = async (data: any): Promise<boolean> => {
    try {
      await api
        .post('judge/insert', {
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

  static getJudge = async (): Promise<ISelectEvent | null> => {
    try {
      const result: { event: ISelectEvent | null } = await api
        .get('judge/start', {})
        .json();
      console.log(result);
      return result ? result.event : null;
    } catch (error) {
      console.log(error);
      if (error instanceof HTTPError) {
        const errorJson = await error.response.json();
        console.log(errorJson);
      } else if (error instanceof Error) {
        console.log(error.message);
      }
      return null;
    }
  };

  static getPlaces = async (): Promise<IPlaces[]> => {
    try {
      const result: IPlaces[] = await api.get('judge/places', {}).json();
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

  static getBusyPlaces = async (eventId: string): Promise<IPlacesEvent[]> => {
    try {
      const result: IPlacesEvent[] = await api
        .get('judge/busy', {
          headers: {
            eventId: eventId,
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

  // : Promise<IPlacesEvent[]>
  static setJudgePlace = async (data: any) => {
    try {
      const result: IPlacesEvent[] = await api
        .post('judge/setPlace', {
          json: {
            data,
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

  // Занятое судьёй место
  static getJudgePlace = async (eventId: string) => {
    try {
      const result: IPlacesEvent = await api
        .get('judge/place', {
          headers: {
            eventId: eventId,
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
      return null;
    }
  };

  // Список предметов
  static getItems = async () => {
    try {
      const result: IItem[] = await api.get('judge/items', {}).json();
      return result;
    } catch (error) {
      console.log(error);
      if (error instanceof HTTPError) {
        const errorJson = await error.response.json();
        console.log(errorJson);
      } else if (error instanceof Error) {
        console.log(error.message);
      }
      return null;
    }
  };

  // Список разрядов соревнования
  static getRanks = async (args: any = {}) => {
    try {
      const result: IRanks[] = await api
        .get('judge/ranks', {
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
      return null;
    }
  };

  // Установить очередность
  static setQueue = async (eventId: number, args: any = {}) => {
    try {
      const result: boolean = await api
        .post('judge/queue', {
          headers: {
            eventId: eventId.toString(),
          },
          json: {
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
      return false;
    }
  };

  // Получить очередность
  static getQueue = async (eventId: string, args: any = {}) => {
    try {
      const result: IEntryPartisipant[] = await api
        .post('judge/getQueue', {
          headers: {
            eventId: eventId.toString(),
          },
          json: {
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
      return null;
    }
  };

  // Оценить участника
  static setJudgeScore = async (args: any = {}) => {
    try {
      const result: boolean = await api
        .post('judge/setJudgeScore', {
          json: {
            ...args,
          },
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
      return false;
    }
  };
}
