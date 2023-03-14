export interface IRanks {
  id: number;
  title: string;
}

export interface ITypes {
  id: number;
  title: string;
}

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
  startDateTime: Date;
  duration: number;
  typeIndividual: boolean;
  masPartisipantsIndividualRanks: string[];
  typeGroup: boolean;
  masPartisipantsGroupRanks: string[];
}
