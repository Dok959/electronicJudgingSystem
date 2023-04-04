import { IRoles } from '..';

export interface ISelectUser {
  id: number;
  sirname: string;
  name: string;
  patronymic?: string;
  email: string;
  password: string;
  role: IRoles;
}
