import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { eventClient } from '@/api';
import { IEventAndSettings, ISettingsEvent, IRanks } from '@/types';
import { EnumTypesEvent, EnumRank } from '@/utils';
import * as Style from './EventsList.css';

export const EventsList = () => {
  let ranks: IRanks[] = useLoaderData() as IRanks[];

  // TODO на сервере создать createmany, updatemany, cascade delete для настроек
  const [events, setEvents] = useState([] as IEventAndSettings[]);

  useEffect(() => {
    async function loadData() {
      setEvents(await eventClient.getEvents([]));
    }
    loadData();
  }, []);

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
      return null;
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
                        <a href="/" className={Style.detail}>
                          Подробнее
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className={Style.content}>Соревнований нет</div>
          )}
        </div>
      </section>
    </>
  );
};
