import { Event as EventModel } from '@prisma/client';

export type EventAndSettings = EventModel & {
  SettingsEvent: SettingsEvent[];
};

export type SettingsEvent = {
  type: types;
  rank: ranks;
};

export type ranks = {
  title: string;
};

export type types = {
  title: string;
};
