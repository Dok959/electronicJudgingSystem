import { IRanks, ITypes } from '..';
import { ISelectAthlete } from './selectAthlete';

export type IPartisipants = {
  athlete: ISelectAthlete;
  settingsEvent: ISettingsEvent;
};

export interface ISettingsEvent {
  id: number;
  eventId: number;
  type: ITypes;
  rank: IRanks;
}
