import { NavLink } from 'react-router-dom';
import * as Style from './Home.css';
import { useStore } from 'effector-react';
import { $grant } from '@/context/auth';

export const HomePage = () => {
  const isHasRights = useStore($grant);
  return (
    <>
      <h3 className={Style.heading}>Выберите действие</h3>
      {isHasRights ? (
        <NavLink to="/event/create" className={Style.link}>
          Создать соревнование
        </NavLink>
      ) : (
        <></>
      )}
      {isHasRights ? (
        <NavLink to="/user/create" className={Style.link}>
          Добавить пользователя
        </NavLink>
      ) : (
        <></>
      )}
      <NavLink to="/home" className={Style.link}>
        Добавить ученика
      </NavLink>
      <NavLink to="/home" className={Style.link}>
        Профиль
      </NavLink>
    </>
  );
};
