export interface ISelectSettingsEvent {
  type: { title: string };
  rank: { title: string };
}

export interface ISelectEvent {
  id: number;
  title: string;
  startDateTime: Date;
  duration: number;
  SettingsEvent: ISelectSettingsEvent[];
}
