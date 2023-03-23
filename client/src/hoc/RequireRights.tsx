import { useLocation, Navigate } from 'react-router-dom';
import { useStore } from 'effector-react';
import { $auth, $grant } from '@/context/auth';
import { authClient } from '@/api';

const RequireRights = ({ children }: any) => {
  // reLoginLoader();
  authClient.reLogin();
  const location = useLocation();
  const isLoggingIn = useStore($auth);
  const isHasRights = useStore($grant);

  if (!isHasRights && !isLoggingIn) {
    return <Navigate to="/home" state={{ from: location }} />;
  }

  return children;
};

export { RequireRights };

export async function reLoginLoader() {
  return await authClient.reLogin();
}
