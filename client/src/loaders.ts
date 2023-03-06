import { authClient } from './api';
import { utilClient } from './api/utilClient';

export async function ranksLoader() {
  return await utilClient.getRanks();
}

export async function reLoginLoader() {
  return await authClient.reLogin();
}
