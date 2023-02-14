import { setAlert } from '@/context/alert';
import { IAlert } from '@/types';
import { alertStatus } from './enum';

export const handleAlertMessage = (alert: IAlert) => {
  setAlert(alert);
  setTimeout(
    () => setAlert({ alertText: '', alertStatus: alertStatus.default }),
    5000,
  );
};
