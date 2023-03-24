import { $auth, fetchAuthFx } from '@/context/authNew';
import { createComponent } from 'effector-react';
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const Auth = createComponent($auth, (props: any, state) => {
  const { children } = props;

  console.log(props);
  useEffect(() => {
    fetchAuthFx();
  }, []);

  const location = useLocation();

  return (
    <div>
      <>
        {$auth ? children : <Navigate to="/login" state={{ from: location }} />}
      </>
    </div>
  );
});

export const RequireAuthNew = ({ children }: any) => {
  // any stuff here
  return <Auth>{children}</Auth>; //<MyCounter />;
};
