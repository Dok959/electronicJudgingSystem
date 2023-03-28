export interface ICustomPropertyCreateEvent {
  title: string;
  startDateTime: Date;
  duration: number;
  typeIndividual: number;
  masPartisipantsIndividualRanks: number[];
  typeGroup: number;
  masPartisipantsGroupRanks: number[];
}

export interface ICreateSettingsEvent {
  typeId: number;
  rankId: number;
}

export interface ICreateEvent {
  title: string;
  startDateTime: Date;
  duration: number;
  SettingsEvent: ICreateSettingsEvent[];
}
