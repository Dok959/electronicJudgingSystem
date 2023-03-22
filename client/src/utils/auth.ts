import { setAlert } from '@/context/alert';
import { IAlert } from '@/types';
import { alertStatus } from './enum';
import { setAuth } from '@/context/auth';

export const removeUser = () => {
  localStorage.removeItem('auth');
  setAuth(false);
};

export const getAuthDataFromLS = () => {
  try {
    const lSData = JSON.parse(localStorage.getItem('auth') as string);

    if (!lSData) {
      removeUser();
      return;
    }

    return lSData;
  } catch (error) {
    removeUser();
  }
};

export const handleAlertMessage = (alert: IAlert) => {
  setAlert(alert);
  setTimeout(() => {
    setAlert({ alertText: '', alertStatus: alertStatus.default });
  }, 5000);
};
