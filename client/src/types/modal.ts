import { ISelectAthlete } from './athlete';
import { ISelectUser } from './user';

export interface IModal {
  masRows: ISelectUser[] | ISelectAthlete[];
  type: 'judges' | 'partisipants' | '';
}
