import { Suspense, useCallback, useEffect, useState } from 'react';
import { Await, Link, defer, useLoaderData } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { eventClient, userClient, utilClient } from '@/api';
import { IRanks } from '@/types';
import { ISelectEvent, ISelectSettingsEvent } from '@/types/event';
import { EnumRank, EnumRole } from '@/utils';
import { $grant } from '@/context/auth';
import { useStore } from 'effector-react';
import * as Style from './UsersList.css';
import { ISelectUser } from '@/types/user';

export async function usersLoader() {
  const result = {
    users: getUsers(),
  };

  return defer(result);
}
async function getUsers() {
  return await userClient.getUsers();
}

export interface IReturnTypes {
  users: ISelectUser[];
}

export const UsersList = () => {
  const isHasRights = useStore($grant);
  const { users } = useLoaderData() as IReturnTypes;

  const [cursorInit, setCursorInit] = useState<number>(0);

  // const loadInitData = useCallback(async () => {
  //   function changeCursor() {
  //     setCursorInit(Users[events.length - 1]?.id);
  //   }

  //   if (cursorInit === 0) {
  //     setEvents(await getEvents([], cursorInit));
  //   }
  //   changeCursor();
  // }, [cursorInit, events]);

  // useEffect(() => {
  //   loadInitData();
  // }, [loadInitData]);

  // const paginationHandler = async (e?: any) => {
  //   e.preventDefault();
  //   const { ranks } = formik.values;
  //   const param = ranks.map((item) => Number(item));
  //   const result = await getEvents(param, cursorInit);
  //   if (result.length === 0) {
  //     const button = document.getElementById('load') as HTMLElement;
  //     button.style.display = 'none';
  //   }
  //   setEvents(events.concat(result));
  // };

  return (
    <>
      <section className={Style.wrapper}>
        <h3 className={Style.heading}>Пользователи</h3>
        <div className={Style.container}>
          <Suspense fallback={<h3 className={Style.heading}>Загрузка...</h3>}>
            <Await resolve={users}>
              {(resolvedUsers) => (
                <>
                  {resolvedUsers.map((item: ISelectUser, index: number) => (
                    <article className={Style.user} key={index}>
                      <h4 className={Style.userTitle}>{`${item.sirname} ${
                        item.name
                      } ${item.patronymic ? item.patronymic : ''}`}</h4>
                      <div className={Style.infoContainer}>
                        <p className={Style.info}>
                          Роль: <span>{item.role.title}</span>
                        </p>

                        {isHasRights ? (
                          <Link to={`${item.id}/edit`} className={Style.detail}>
                            Подробнее
                          </Link>
                        ) : (
                          <></>
                        )}
                      </div>
                    </article>
                  ))}
                  {resolvedUsers.length > 0 &&
                  resolvedUsers.length % 2 === 0 ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        console.log('тут');
                      }}
                      className={Style.detail}
                      id="load"
                    >
                      Загрузить ещё
                    </button>
                  ) : (
                    <></>
                  )}
                  {resolvedUsers.length === 0 ? (
                    <div className={Style.content}>
                      Пользователей не обнаружено
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </Await>
          </Suspense>
        </div>
      </section>
    </>
  );
};
