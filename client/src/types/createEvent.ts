export interface ICustomSettingsEvent {
  typeIndividual: number;
  masPartisipantsIndividualRanks: number[];
  typeGroup: number;
  masPartisipantsGroupRanks: number[];
}

export interface ICustomCreateEvent {
  title: string;
  startDateTime: Date;
  duration: number;
  SettingsEvent: ICustomSettingsEvent[];
}
