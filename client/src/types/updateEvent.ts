export interface ICustomPropertyUpdateEvent {
  id: number;
  title: string;
  startDateTime: Date;
  duration: number;
  typeIndividual: number;
  masPartisipantsIndividualRanks: number[];
  typeGroup: number;
  masPartisipantsGroupRanks: number[];
}

export interface IUpdateSettingsEvent {
  typeId: number;
  rankId: number;
}

export interface IUpdateEvent {
  id: number;
  title: string;
  startDateTime: Date;
  duration: number;
  SettingsEvent: IUpdateSettingsEvent[];
}
