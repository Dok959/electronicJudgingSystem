import { createDomain } from 'effector';
import { IModal } from '../types/index';

const error = createDomain();

export const setModal = error.createEvent<IModal>();

export const $modal = error
  .createStore<IModal>({ masRows: [] })
  .on(setModal, (_, value) => value);
