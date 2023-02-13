import { ISpinnerProps } from '../../types';
import * as Style from './Spinner.css';

export const Spinner = ({ top, left }: ISpinnerProps) => (
  <div
    style={{ top: `${top}px`, left: `${left}px` }}
    className={Style.spinner}
    role="status"
  />
);
