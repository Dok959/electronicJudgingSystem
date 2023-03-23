import { useLocation, Navigate } from 'react-router-dom';
import { useStore } from 'effector-react';
import { $auth, $grant } from '@/context/auth';

const RequireRights = ({ children }: any) => {
  const location = useLocation();
  const isLoggingIn = useStore($auth);
  const isHasRights = useStore($grant);

  if (!isHasRights && !isLoggingIn) {
    return <Navigate to="/home" state={{ from: location }} />;
  }

  return children;
};

export { RequireRights };
