export interface IRanks {
  id: number;
  title: string;
}

export interface ITypes {
  id: number;
  title: string;
}

export interface IRoles {
  id: number;
  title: string;
}

export interface ISettingsEvent {
  type: { title: string };
  rank: { title: string };
}

export interface IEventAndSettings {
  id: number;
  title: string;
  startDateTime: Date;
  duration: number;
  SettingsEvent: ISettingsEvent[];
}
