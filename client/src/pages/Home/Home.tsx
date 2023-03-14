import { NavLink } from 'react-router-dom';
import * as Style from './Home.css';
import { useStore } from 'effector-react';
import { $grant } from '@/context/auth';

export const HomePage = () => {
  const isHasRights = useStore($grant);
  return (
    <>
      {isHasRights ? (
        <NavLink to="/event/create">Создать соревнование</NavLink>
      ) : (
        <></>
      )}
      {isHasRights ? (
        <NavLink to="/user/create">Добавить пользователя</NavLink>
      ) : (
        <></>
      )}
      <NavLink to="/home">Добавить ученика</NavLink>
      <NavLink to="/home">Профиль</NavLink>
    </>
  );
};
