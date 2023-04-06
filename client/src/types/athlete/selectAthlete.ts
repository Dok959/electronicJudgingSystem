import { IRoles } from '..';

export interface ISelectAthlete {
  id: number;
  sirname: string;
  name: string;
  patronymic?: string;
  email: string;
  password: string;
  role: IRoles;
}
