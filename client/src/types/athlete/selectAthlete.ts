import { IRanks } from '..';

export interface ISelectAthlete {
  id: number;
  sirname: string;
  name: string;
  patronymic?: string;
  rank: IRanks;
}
