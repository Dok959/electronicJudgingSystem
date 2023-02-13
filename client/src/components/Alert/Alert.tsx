import { IAlertProps } from '@/types';
import * as Style from './Alert.css';
import { alertStatus } from '@/utils/enum';

export const Alert = ({ props }: IAlertProps) => {
  const status = props.alertStatus ?? alertStatus.default;
  return (
    // TODO
    <div
      className={Style.alert({
        border: status ?? 'default',
      })}
    >
      <h4>{props.alertStatus}</h4>
      <p className="text">{props.alertText}</p>
      <button id="close-button" className="close-button">
        &#10005;
      </button>
    </div>
  );
};
