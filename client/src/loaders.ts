import { authClient } from './api';
import { rankClient } from './api/rankClient';

export async function ranksLoader() {
  return await rankClient.getRanks();
}

export async function reLoginLoader() {
  return await authClient.reLogin();
}
