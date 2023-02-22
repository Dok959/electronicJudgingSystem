import { Form, useLoaderData, useSubmit } from 'react-router-dom';
import { EventAndSettings, SettingsEvent, TypesEvent, Rank } from '@/types';
import * as Style from './EventsList.css';
import { eventClient } from '@/api/eventClient';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

export const EventsList = () => {
  // TODO на сервере создать createmany, updatemany, cascade delete для настроек
  let events: EventAndSettings[] = useLoaderData() as EventAndSettings[];
  // const events: EventAndSettings[] = [];
  // const { contacts, q } = useLoaderData();

  // const submit = useSubmit();

  const parseDateTime = (dateTime: Date, isDate: boolean) => {
    const date = new Date(dateTime);
    if (isDate) {
      return date.toLocaleString().split(', ')[0];
    } else {
      return date.toLocaleString().split(', ')[1];
    }
  };

  const parseRanks = (mas: SettingsEvent[]) => {
    let result = '';
    mas.map(
      (item) => (result += Rank[item.rank.title as keyof typeof Rank] + ', '),
    );
    return result.slice(0, -2);
  };

  const parseTypes = (mas: SettingsEvent[]) => {
    let isIndivigual = false,
      isGroup = false;
    mas.map((item) => {
      if (
        TypesEvent['Индивидуальное'] ===
        TypesEvent[item.type.title as keyof typeof TypesEvent]
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
      console.log(ranks);
      events = await eventClient.getEvents(ranks);
      return null;
    },
  });

  return (
    <>
      {events?.length ? (
        <section className={Style.wrapper}>
          <h3 className={Style.heading}>Соревнования</h3>
          <div className={Style.container}>
            <aside className={Style.filter}>
              <form method="post">
                <p className={Style.item}>
                  <input
                    type="checkbox"
                    id="mc"
                    className={Style.input}
                    name="mc"
                    // onChange={(event) => {
                    //   submit(null, { method: 'post' });
                    //   // submit(event.currentTarget.form);
                    // }}
                    value={1}
                    // value={formik.values.ranks}
                    onChange={(e) => {
                      const lengthInit = formik.values.ranks.length;
                      formik.values.ranks.filter((item) => item !== 1);
                      const lengthUpdate = formik.values.ranks.length;
                      if (lengthInit === lengthUpdate) {
                        formik.values.ranks.push(1);
                      }
                      // const isExisting = formik.values.ranks.filter(
                      //   (item) => item === 1,
                      // );
                      // isExisting
                      //   ? formik.values.ranks.pop(1)
                      //   : formik.values.ranks.push(1);
                      // formik.values.ranks.push(1);
                      // submit(e.currentTarget.form);
                      formik.handleChange(e);
                      formik.submitForm();
                    }}
                    onBlur={formik.handleBlur}
                  />
                  <label htmlFor="mc" className={Style.label}>
                    МС
                  </label>
                </p>
                <p className={Style.item}>
                  <input type="checkbox" id="kmc" className={Style.input} />
                  <label htmlFor="kmc" className={Style.label}>
                    КМС
                  </label>
                </p>
                <p className={Style.item}>
                  <input type="checkbox" id="1c" className={Style.input} />
                  <label htmlFor="1c" className={Style.label}>
                    1C
                  </label>
                </p>
                <p className={Style.item}>
                  <input type="checkbox" id="2c" className={Style.input} />
                  <label htmlFor="2c" className={Style.label}>
                    2C
                  </label>
                </p>
                <p className={Style.item}>
                  <input type="checkbox" id="3c" className={Style.input} />
                  <label htmlFor="3c" className={Style.label}>
                    3C
                  </label>
                </p>
                <p className={Style.item}>
                  <input type="checkbox" id="1y" className={Style.input} />
                  <label htmlFor="1y" className={Style.label}>
                    1Ю
                  </label>
                </p>
                <p className={Style.item}>
                  <input type="checkbox" id="2y" className={Style.input} />
                  <label htmlFor="2y" className={Style.label}>
                    2Ю
                  </label>
                </p>
                <p className={Style.item}>
                  <input type="checkbox" id="3y" className={Style.input} />
                  <label htmlFor="3y" className={Style.label}>
                    3Ю
                  </label>
                </p>
                <p className={Style.item}>
                  <input type="checkbox" id="no" className={Style.input} />
                  <label htmlFor="no" className={Style.label}>
                    БР
                  </label>
                </p>
              </form>
            </aside>

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
          </div>
        </section>
      ) : (
        <div>{null}</div>
      )}
    </>
  );
};
