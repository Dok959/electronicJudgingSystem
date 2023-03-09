import { useCallback, useEffect, useState } from 'react';
import { useLoaderData, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { eventClient } from '@/api';
import { IEventAndSettings, ISettingsEvent, IRanks } from '@/types';
import { EnumTypesEvent, EnumRank } from '@/utils';
import * as Style from './EventsList.css';

export const EventsList = () => {
  let ranks: IRanks[] = useLoaderData() as IRanks[];

  const [events, setEvents] = useState<IEventAndSettings[]>([]);
  const [cursorInit, setCursorInit] = useState<number>(0);

  const loadInitData = useCallback(async () => {
    function changeCursor() {
      setCursorInit(events[events.length - 1]?.id);
    }

    if (cursorInit === 0) {
      setEvents(await eventClient.getEvents([]));
    }
    changeCursor();
  }, [cursorInit, events]);

  useEffect(() => {
    loadInitData();
  }, [loadInitData]);

  const location = useLocation();

  const parseDateTime = (dateTime: Date, isDate: boolean) => {
    const date = new Date(dateTime);
    if (isDate) {
      return date.toLocaleString().split(', ')[0];
    } else {
      return date.toLocaleString().split(', ')[1];
    }
  };

  const parseRanks = (mas: ISettingsEvent[]) => {
    let result = '';
    mas.map(
      (item) =>
        (result += EnumRank[item.rank.title as keyof typeof EnumRank] + ', '),
    );
    return result.slice(0, -2);
  };

  const parseTypes = (mas: ISettingsEvent[]) => {
    let isIndivigual = false,
      isGroup = false;
    mas.map((item) => {
      if (
        EnumTypesEvent['Индивидуальное'] ===
        EnumTypesEvent[item.type.title as keyof typeof EnumTypesEvent]
      ) {
        return (isIndivigual = true);
      } else {
        return (isGroup = true);
      }
    });

    return (
      <>
        {isIndivigual ? <p className={Style.tag}>Индивидуальное</p> : null}
        {isGroup ? <p className={Style.tag}>Групповое</p> : null}
      </>
    );
  };

  const paginationHandler = async (e?: any) => {
    e.preventDefault();
    const { ranks } = formik.values;
    const param = ranks.map((item) => Number(item));
    const result = await eventClient.getEvents(param, cursorInit);
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
      setEvents(await eventClient.getEvents(param));

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
          {ranks?.length ? (
            <aside className={Style.filter}>
              <form className={Style.form}>
                {ranks.map((item) => (
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
                    <label htmlFor={item.id.toString()} className={Style.label}>
                      {EnumRank[item.title as keyof typeof EnumRank]}
                    </label>
                  </p>
                ))}
              </form>
            </aside>
          ) : (
            <>{null}</>
          )}

          {events?.length ? (
            <div className={Style.content}>
              {events.map((item) => (
                <article className={Style.event} key={item.id}>
                  <h4 className={Style.eventTitle}>{item.title}</h4>
                  <div className={Style.infoContainer}>
                    <div className={Style.flexContainer({})}>
                      <p className={Style.info}>
                        Дата:{' '}
                        <span>{parseDateTime(item.startDateTime, true)}</span>
                      </p>
                      <p className={Style.info}>
                        Время:{' '}
                        <span>{parseDateTime(item.startDateTime, false)}</span>
                      </p>
                    </div>

                    <div className={Style.flexContainer({ flex: 'wrap' })}>
                      <p className={Style.info}>
                        Квалификация:{' '}
                        <span>{parseRanks(item.SettingsEvent)}</span>
                      </p>
                      <div className={Style.tags}>
                        {parseTypes(item.SettingsEvent)}
                        {location.pathname === '/event' ? (
                          <a href="/" className={Style.detail}>
                            Подробнее
                          </a>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              {events.length % 2 === 0 ? (
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
            </div>
          ) : (
            <div className={Style.content}>Соревнований нет</div>
          )}
        </div>
      </section>
    </>
  );
};
