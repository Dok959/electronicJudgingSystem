export enum TypesEvent {
  'Индивидуальное' = 'Индивидуальное',
  'Групповое' = 'Групповое',
}

export enum Rank {
  'Мастер спорта' = 'МС',
  'Кандидат в мастера спорта' = 'КМС',
  '1 разряд' = '1С',
  '2 разряд' = '2С',
  '3 разряд' = 'C3',
  '1 юношеский' = 'Y1',
  '2 юношеский' = 'Y2',
  '3 юношеский' = 'Y3',
  'Без разряда' = 'БР',
}

export type SettingsEvent = {
  type: { title: string };
  rank: { title: string };
};

export type EventAndSettings = {
  id: number;
  title: string;
  startDateTime: Date;
  duration: number;
  SettingsEvent: SettingsEvent[];
};
