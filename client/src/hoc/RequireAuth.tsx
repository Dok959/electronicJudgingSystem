import { useLocation, Navigate } from 'react-router-dom';
import { useStore } from 'effector-react';
import { $auth } from '@/context/auth';

const RequireAuth = ({ children }: any) => {
  const location = useLocation();
  const isLoggingIn = useStore($auth);

  if (!isLoggingIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export { RequireAuth };
