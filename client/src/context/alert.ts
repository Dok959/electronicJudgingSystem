import { createDomain } from 'effector';
import { IAlert } from '../types/index';
import { alertStatus } from '@/utils/enum';
const error = createDomain();

export const setAlert = error.createEvent<IAlert>();

export const $alert = error
  .createStore<IAlert>({ alertText: '', alertStatus: alertStatus.default })
  .on(setAlert, (_, value) => value);
