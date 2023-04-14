import { IPartisipants } from './athlete';
import { ISelectUser } from './user';

export interface IModal {
  masRows: ISelectUser[] | IPartisipants[];
  type: 'judges' | 'partisipants' | '';
}
