import { Suspense, useCallback, useEffect, useState } from 'react';
import { Await, Link, defer, useLoaderData } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { eventClient, utilClient } from '@/api';
import { IRanks } from '@/types';
import { ISelectEvent, ISelectSettingsEvent } from '@/types/event';
import { EnumRank } from '@/utils';
import * as Style from './EventsList.css';
import { $grant } from '@/context/auth';
import { useStore } from 'effector-react';

export interface IReturnTypes {
  ranks: IRanks[];
}

export const EventsList = () => {
  const isHasRights = useStore($grant);
  const { ranks } = useLoaderData() as IReturnTypes;

  const [events, setEvents] = useState<ISelectEvent[]>([]);
  const [cursorInit, setCursorInit] = useState<number>(0);

  const loadInitData = useCallback(async () => {
    function changeCursor() {
      setCursorInit(events[events.length - 1]?.id);
    }

    if (cursorInit === 0) {
      setEvents(await getEvents([], cursorInit));
    }
    changeCursor();
  }, [cursorInit, events]);

  useEffect(() => {
    loadInitData();
  }, [loadInitData]);

  const parseDateTime = (dateTime: Date, isDate: boolean) => {
    const date = new Date(dateTime);
    if (isDate) {
      return date.toLocaleString().split(', ')[0];
    } else {
      return date.toLocaleString().split(', ')[1];
    }
  };

  const parseSettings = (mas: ISelectSettingsEvent[], type: string) => {
    let result = `${type}: `;
    const typeMas = mas.filter((item) => item.type.title === type);
    if (typeMas.length === 0) {
      return null;
    }
    typeMas.map(
      (item) =>
        (result += EnumRank[item.rank.title as keyof typeof EnumRank] + ', '),
    );
    return result.slice(0, -2);
  };

  const paginationHandler = async (e?: any) => {
    e.preventDefault();
    const { ranks } = formik.values;
    const param = ranks.map((item) => Number(item));
    const result = await getEvents(param, cursorInit);
    if (result.length === 0) {
      const button = document.getElementById('load') as HTMLElement;
      button.style.display = 'none';
    }
    setEvents(events.concat(result));
  };

  const formik = useFormik({
    initialValues: {
      ranks: [] as number[],
    },
    validationSchema: Yup.object({
      ranks: Yup.array().of(Yup.number()),
    }),
    onSubmit: async (values) => {
      const { ranks } = values;
      const param = ranks.map((item) => Number(item));
      const result = await getEvents(param, 0);
      setEvents(result);

      const button = document.getElementById('load') as HTMLElement;
      if (button !== null) {
        button.style.display = 'block';
      }
    },
  });

  return (
    <>
      <section className={Style.wrapper}>
        <h3 className={Style.heading}>Соревнования</h3>
        <div className={Style.container}>
          <Suspense fallback={<h3 className={Style.heading}>Загрузка...</h3>}>
            <Await resolve={ranks}>
              {(resolvedRanks) => (
                <aside className={Style.filter}>
                  <form className={Style.form}>
                    {resolvedRanks.map((item: any) => (
                      <p className={Style.item} key={item.id}>
                        <input
                          type="checkbox"
                          id={item.id.toString()}
                          className={Style.input}
                          name="ranks"
                          value={item.id}
                          onChange={(e) => {
                            formik.handleChange(e);
                            formik.submitForm();
                          }}
                          onBlur={formik.handleBlur}
                        />
                        <label
                          htmlFor={item.id.toString()}
                          className={Style.label}
                        >
                          {EnumRank[item.title as keyof typeof EnumRank]}
                        </label>
                      </p>
                    ))}
                  </form>
                </aside>
              )}
            </Await>
          </Suspense>

          <Suspense fallback={<h3 className={Style.heading}>Загрузка...</h3>}>
            <Await resolve={events}>
              {(resolvedEvents) => (
                <div className={Style.content}>
                  {resolvedEvents.map((item: any) => (
                    <article className={Style.event} key={item.id}>
                      <h4 className={Style.eventTitle}>{item.title}</h4>
                      <div className={Style.infoContainer}>
                        <div className={Style.flexContainer({})}>
                          <p className={Style.info}>
                            Дата:{' '}
                            <span>
                              {parseDateTime(item.startDateTime, true)}
                            </span>
                          </p>
                          <p className={Style.info}>
                            Время:{' '}
                            <span>
                              {parseDateTime(item.startDateTime, false)}
                            </span>
                          </p>
                        </div>

                        <div className={Style.flexContainer({ flex: 'wrap' })}>
                          <p className={Style.info}>
                            {parseSettings(
                              item.SettingsEvent,
                              'Индивидуальное',
                            )}
                          </p>
                          <p className={Style.info}>
                            {parseSettings(item.SettingsEvent, 'Групповое')}
                          </p>
                        </div>
                        {isHasRights ? (
                          <div
                            className={Style.flexContainer({ flex: 'wrap' })}
                          >
                            <div className={Style.tags}>
                              <Link
                                to={`${item.id}/edit`}
                                className={Style.detail}
                              >
                                Подробнее
                              </Link>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </article>
                  ))}
                  {resolvedEvents.length > 0 &&
                  resolvedEvents.length % 2 === 0 ? (
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
                  {resolvedEvents.length === 0 ? (
                    <div className={Style.content}>Соревнований нет</div>
                  ) : (
                    <></>
                  )}
                </div>
              )}
            </Await>
          </Suspense>
        </div>
      </section>
    </>
  );
};

async function getRanks() {
  return await utilClient.getRanks();
}

async function getEvents(ranks: number[] = [], cursorInit: number = 0) {
  return await eventClient.getEvents(ranks, cursorInit);
}

export const ranksLoader = async () => {
  const result = {
    ranks: getRanks(),
  };

  return defer(result);
};
