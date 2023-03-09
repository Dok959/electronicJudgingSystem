import { createDomain } from 'effector';

const auth = createDomain();

export const setAuth = auth.createEvent<boolean>();

export const $auth = auth
  .createStore<boolean>(false)
  .on(setAuth, (_, value) => value);

export const setGrant = auth.createEvent<boolean>();

export const $grant = auth
  .createStore<boolean>(false)
  .on(setGrant, (_, value) => value);
