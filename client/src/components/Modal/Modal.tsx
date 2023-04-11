import { IAlertProps } from '@/types';
import { alertStatus } from '@/utils/enum';
import { handleAlertMessage } from '@/utils/auth';
import * as Style from './Modal.css';
import { handleModal } from '@/utils/modal';

export const Modal = ({ props }: any) => {
  const clickHandler = () => {
    handleModal({
      masRows: [],
    });
  };

  console.log(props);
  return (
    <div className={Style.window}>
      <div>
        <p className={Style.text}>{props.alertText}</p>
        <select name="" id="">
          <option value="das">ntgc</option>
        </select>
      </div>
      <button className={Style.close} onClick={clickHandler}>
        <svg
          width="15"
          height="15"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 18L9.5 9.5L1 1M1 18L18 1"
            stroke="#24293D"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};
