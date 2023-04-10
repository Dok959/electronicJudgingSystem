import { IRanks } from '../api';

export interface ICustomPropertySelectedEvent {
  title: string;
  startDateTime: Date;
  duration: number;
  typeIndividual: number;
  masPartisipantsIndividualRanks: IRanks[];
  typeGroup: number;
  masPartisipantsGroupRanks: IRanks[];
}
