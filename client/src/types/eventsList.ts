export enum TypesEvent {
  Individual = 'Индивидуальное',
  Group = 'Групповое',
}

enum Rank {
  MC = 'Мастер спорта',
  KMC = 'Кандидат в мастера спорта',
  C1 = '1 разряд',
  C2 = '2 разряд',
  C3 = '3 разряд',
  Y1 = '1 юношеский',
  Y2 = '2 юношеский',
  Y3 = '3 юношеский',
  NO = 'Без разряда',
}

export type SettingsEvent = {
  id: number;
  eventId: number;
  type: TypesEvent;
  rank: Rank;
};

export type EventAndSettings = {
  id: number;
  title: string;
  startDateTime: Date;
  duration: number;
  SettingsEvent: SettingsEvent[];
};
