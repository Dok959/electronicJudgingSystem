import { useLocation, Navigate } from 'react-router-dom';
// import { useAuth } from '../hook/useAuth';
import { useStore } from 'effector-react';
import { $auth, $grant } from '@/context/auth';

// JSX.Element
const RequireAuth = ({ children }: any) => {
  const location = useLocation();
  // const { user } = useAuth();
  const isLoggingIn = useStore($auth);
  const isHasRights = useStore($grant);

  if (!isLoggingIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export { RequireAuth };
