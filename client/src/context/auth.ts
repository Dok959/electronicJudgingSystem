import { authClient } from '@/api';
import { createDomain } from 'effector';

const auth = createDomain();

export const setAuth = auth.createEvent<boolean>();
export const resetAuth = auth.createEvent();

export const fetchAuthFromStorageFx = auth.createEffect({
  async handler() {
    return await authClient.reLogin();
  },
});

fetchAuthFromStorageFx.doneData.watch((result) => {
  setAuth(result);
});

export const $auth = auth
  .createStore<boolean>(false)
  .on(setAuth, (_, value) => value)
  .reset(resetAuth);

fetchAuthFromStorageFx();

export const setGrant = auth.createEvent<boolean>();
export const resetGrant = auth.createEvent();

export const $grant = auth
  .createStore<boolean>(false)
  .on(setGrant, (_, value) => value)
  .reset(resetGrant);
