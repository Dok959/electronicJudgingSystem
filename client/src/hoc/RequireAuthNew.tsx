import React, { useEffect, useState } from 'react';
import { useStore, useList } from 'effector-react';
import {
  $beers,
  $selectedBeer,
  // $beersError,
  fetchBeersFx,
  selectBeer,
} from '../context/test';
import { $auth, fetchAuthFx } from '@/context/authNew';
import { Navigate, useLocation } from 'react-router-dom';

const Loading = () => {
  const isLoading = useStore(fetchAuthFx.pending);
  console.log(`ожидание ${isLoading}`);
  return <>{isLoading && 'Loading...'}</>;
};

const Auth = ({ children }: any) => {
  const location = useLocation();
  const isLogin = useStore($auth);
  console.log(`рендер ${isLogin}`);
  return isLogin ? (
    children
  ) : (
    <h4>Пусто</h4>
    // <Navigate to="/login" state={{ from: location }} />
  );
};

export default function RequireAuthOld({ children }: any) {
  const isLogin = useStore($auth);
  console.log(isLogin);
  useEffect(() => {
    fetchAuthFx();
  }, []);
  console.log(isLogin);

  return (
    <>
      <h2>Effector List</h2>
      <Loading />
      {isLogin ? <Auth>{children}</Auth> : <></>}
    </>
  );
}
