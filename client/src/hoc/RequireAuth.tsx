import { $auth, fetchAuthFx } from '@/context/auth';
import { createComponent } from 'effector-react';
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const Auth = createComponent($auth, (props: any, state) => {
  const { children } = props;

  useEffect(() => {
    fetchAuthFx();
  }, []);

  const location = useLocation();

  return (
    <>
      {$auth ? children : <Navigate to="/login" state={{ from: location }} />}
    </>
  );
});

export const RequireAuth = ({ children }: any) => {
  return <Auth>{children}</Auth>;
};
