import { authClient } from '@/api';
import { createDomain } from 'effector';

const auth = createDomain();

export const fetchAuthFx = auth.createEffect(async () => {
  return await authClient.reLogin();
});

export const setAuth = auth.createEvent<boolean>();

export const $auth = auth
  .createStore<boolean>(false)
  .on(fetchAuthFx.doneData, (_state, value) => value)
  .on(setAuth, (_state, value) => value);
