import { alertStatus } from '../utils/enum';
export interface IAlert {
  alertText: string;
  alertStatus: alertStatus;
}
export interface IAlertProps {
  props: IAlert;
}

export interface ISpinnerProps {
  top: number;
  left: number;
}
