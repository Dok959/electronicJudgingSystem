import { $grant, fetchAuthFx } from '@/context/auth';
import { createComponent } from 'effector-react';
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const Grant = createComponent($grant, (props: any, state) => {
  const { children } = props;

  useEffect(() => {
    fetchAuthFx();
  }, []);

  const location = useLocation();

  return (
    <>
      {$grant ? children : <Navigate to="/home" state={{ from: location }} />}
    </>
  );
});

export const RequireRights = ({ children }: any) => {
  return <Grant>{children}</Grant>;
};
