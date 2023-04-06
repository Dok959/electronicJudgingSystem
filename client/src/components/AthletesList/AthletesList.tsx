import { Suspense, useCallback, useEffect, useState } from 'react';
import { Await, Link } from 'react-router-dom';
import { userClient } from '@/api';
import { $grant } from '@/context/auth';
import { useStore } from 'effector-react';
import * as Style from './AthletesList.css';
import { ISelectUser } from '@/types/user';

async function getUsers(args = {}) {
  return await userClient.getUsers(args);
}

// TODO создать возможность редактирования пользователя
export const AthletesList = () => {
  const isHasRights = useStore($grant);

  const [users, setUsers] = useState<ISelectUser[]>([]);
  const [cursorInit, setCursorInit] = useState<number>(0);

  const loadUsersData = useCallback(async () => {
    function changeCursor() {
      setCursorInit(users[users.length - 1]?.id);
    }

    if (cursorInit === 0) {
      setUsers(await getUsers({}));
    }
    changeCursor();
  }, [cursorInit, users]);

  useEffect(() => {
    loadUsersData();
  }, [loadUsersData]);

  const paginationHandler = async (e?: any) => {
    e.preventDefault();
    const args = { cursor: cursorInit, skip: 1 };
    const result = await getUsers(args);
    if (result.length === 0) {
      const button = document.getElementById('load') as HTMLElement;
      button.style.display = 'none';
    }
    setUsers(users.concat(result));
  };

  return (
    <>
      <section className={Style.wrapper}>
        <h3 className={Style.heading}>Пользователи</h3>
        <div className={Style.container}>
          <Suspense fallback={<h3 className={Style.heading}>Загрузка...</h3>}>
            <Await resolve={users}>
              {(resolvedUsers: ISelectUser[]) => (
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

                        {/* {isHasRights ? (
                          <Link to={`${item.id}/edit`} className={Style.detail}>
                            Подробнее
                          </Link>
                        ) : (
                          <></>
                        )} */}
                      </div>
                    </article>
                  ))}
                  {resolvedUsers.length > 0 &&
                  resolvedUsers.length % 2 === 0 ? (
                    <button
                      onClick={paginationHandler}
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
