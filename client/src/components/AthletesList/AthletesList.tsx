import { Suspense, useCallback, useEffect, useState } from 'react';
import { Await, Link } from 'react-router-dom';
import { athleteClient, userClient } from '@/api';
import { $grant } from '@/context/auth';
import { useStore } from 'effector-react';
import * as Style from './AthletesList.css';
import { ISelectAthlete } from '@/types/athlete';
import { EnumRank } from '@/utils';

async function getAthletes(args = {}) {
  return await athleteClient.getAthletes(args);
}

// TODO создать возможность редактирования пользователя
export const AthletesList = () => {
  const isHasRights = useStore($grant);

  const [athletes, setAthletes] = useState<ISelectAthlete[]>([]);
  const [cursorInit, setCursorInit] = useState<number>(0);

  const loadUsersData = useCallback(async () => {
    function changeCursor() {
      setCursorInit(athletes[athletes.length - 1]?.id);
    }

    if (cursorInit === 0) {
      setAthletes(await getAthletes({}));
    }
    changeCursor();
  }, [cursorInit, athletes]);

  useEffect(() => {
    loadUsersData();
  }, [loadUsersData]);

  const paginationHandler = async (e?: any) => {
    e.preventDefault();
    const args = { cursor: cursorInit, skip: 1 };
    const result = await getAthletes(args);
    if (result.length === 0) {
      const button = document.getElementById('load') as HTMLElement;
      button.style.display = 'none';
    }
    setAthletes(athletes.concat(result));
  };

  return (
    <>
      <section className={Style.wrapper}>
        <h3 className={Style.heading}>Ученики</h3>
        <div className={Style.container}>
          <Suspense fallback={<h3 className={Style.heading}>Загрузка...</h3>}>
            <Await resolve={athletes}>
              {(resolvedAthletes: ISelectAthlete[]) => (
                <>
                  {resolvedAthletes.map(
                    (item: ISelectAthlete, index: number) => (
                      <article className={Style.athletes} key={index}>
                        <h4 className={Style.userTitle}>{`${item.sirname} ${
                          item.name
                        } ${item.patronymic ? item.patronymic : ''}`}</h4>
                        <div className={Style.infoContainer}>
                          <p className={Style.info}>
                            Разряд:{' '}
                            <span>
                              {
                                EnumRank[
                                  item.rank.title as keyof typeof EnumRank
                                ]
                              }
                            </span>
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
                    ),
                  )}
                  {resolvedAthletes.length > 0 &&
                  resolvedAthletes.length % 2 === 0 ? (
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
                  {resolvedAthletes.length === 0 ? (
                    <div className={Style.content}>Учеников не обнаружено</div>
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
