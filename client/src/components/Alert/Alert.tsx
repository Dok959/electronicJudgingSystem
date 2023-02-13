import { IAlertProps } from '@/types';

export const Alert = ({ props }: IAlertProps) => {
  return (
    <div>
      <h4>{props.alertStatus}</h4>
      {props.alertText}
    </div>
  );
};
