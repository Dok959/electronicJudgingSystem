import { authClient } from './api';

export async function reLoginLoader() {
  return await authClient.reLogin();
}
