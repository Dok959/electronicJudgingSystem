import { authClient } from '@/api';
import { createDomain } from 'effector';

const auth = createDomain();

export const fetchAuthFx = auth.createEffect(async () => {
  return await authClient.reLogin();
});

export const setAuth = auth.createEvent<boolean>();
export const resetAuth = auth.createEvent();

fetchAuthFx.doneData.watch((result) => {
  setAuth(result);
});

export const $auth = auth
  .createStore<boolean>(false)
  .on(fetchAuthFx.doneData, (_state, value) => value)
  .on(setAuth, (_state, value) => value)
  .reset(resetAuth);

export const setGrant = auth.createEvent<boolean>();
export const resetGrant = auth.createEvent();

export const $grant = auth
  .createStore<boolean>(false)
  .on(setGrant, (_, value) => value)
  .reset(resetGrant);

fetchAuthFx();
