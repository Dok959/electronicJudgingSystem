import { useLocation, Navigate } from 'react-router-dom';
import { useStore } from 'effector-react';
import { $auth, $grant } from '@/context/auth';
import { authClient } from '@/api';

// JSX.Element
const RequireAuth = ({ children }: any) => {
  reLoginLoader();
  const location = useLocation();
  const isLoggingIn = useStore($auth);

  if (!isLoggingIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export { RequireAuth };

export async function reLoginLoader() {
  await authClient.reLogin();
}
