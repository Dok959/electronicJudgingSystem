import { IRanks, ITypes } from '@/types/api';

export interface ILoadSettingsEvent {
  type: ITypes;
  rank: IRanks;
}

export interface ILoadEventAndSettings {
  id: number;
  title: string;
  startDateTime: Date;
  duration: number;
  SettingsEvent: ILoadSettingsEvent[];
}

export interface IRenderEventAndSettings {
  id: number;
  title: string;
  startDateTime: string;
  duration: number;
  typeIndividual: boolean;
  masPartisipantsIndividualRanks: number[];
  typeGroup: boolean;
  masPartisipantsGroupRanks: number[];
}
