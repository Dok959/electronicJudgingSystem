import { useLocation, Navigate } from 'react-router-dom';
import { useStore } from 'effector-react';
import { $auth, $grant } from '@/context/auth';

// JSX.Element
const RequireAuth = ({ children }: any) => {
  const location = useLocation();
  const isLoggingIn = useStore($auth);
  const isHasRights = useStore($grant);
  console.log(isLoggingIn);

  if (!isLoggingIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export { RequireAuth };
