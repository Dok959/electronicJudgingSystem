import { IItem, IRanks } from '../api';

export type IEntryPartisipant = {
  id: number;
  item: IItem;
  partisipant: IPartisipant;
};

type IPartisipant = {
  id: number;
  athlete: IAthlete;
};

type IAthlete = {
  id: number;
  name: string;
  sirname: string;
  patronymic: string;
  dateOfBirth: Date;
  rank: IRanks;
  trainerId: number;
};
