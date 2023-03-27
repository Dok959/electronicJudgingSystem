import { Suspense, useState } from 'react';
import { eventClient, utilClient } from '@/api';
import { IRanks } from '@/types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Spinner } from '@/components';
import { handleAlertMessage } from '@/utils/auth';
import { EnumRank, alertStatus } from '@/utils/enum';
import * as Style from './CreateEvent.css';

import { Await, NavLink, defer, useLoaderData, useNavigate } from 'react-router-dom';

export interface IReturnTypes {
  ranks: IRanks[];
}

export const CreateEventPage = () => {
  const { ranks } = useLoaderData() as IReturnTypes;

  const [spinner, setSpinner] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      title: '',
      startDateTime: '',
      duration: 1,
      typeIndividual: false,
      masPartisipantsIndividualRanks: [],
      typeGroup: false,
      masPartisipantsGroupRanks: [],
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .trim()
        .required('Обязательно')
        .min(3, 'Укажите корректное название'),
      startDateTime: Yup.date()
        .required('Обязательно')
        .default(() => new Date())
        .min(
          new Date(new Date().toISOString().slice(0, -10) + '00'),
          'Дата или время не могут быть прошедшими',
        ),
      duration: Yup.number().default(1).min(1),
    }),
    onSubmit: async (values) => {
      const {
        title,
        startDateTime,
        duration,
        masPartisipantsIndividualRanks,
        masPartisipantsGroupRanks,
      } = values;
      setSpinner(true);
      const result = await eventClient.create({
        title,
        startDateTime: new Date(startDateTime),
        duration: Number(duration),
        typeIndividual: 1,
        masPartisipantsIndividualRanks: masPartisipantsIndividualRanks.map(
          (item) => Number(item),
        ),
        typeGroup: 2,
        masPartisipantsGroupRanks: masPartisipantsGroupRanks.map((item) =>
          Number(item),
        ),
      });
      setSpinner(false);
      if (!result) {
        handleAlertMessage({
          alertText: 'Не корректные данные',
          alertStatus: alertStatus.warning,
        });
        return null;
      }
      navigate('/event');
      return handleAlertMessage({
        alertText: 'Соревнование создано',
        alertStatus: alertStatus.success,
      });
    },
  });

  return (
    <>
      <section className={Style.wrapper}>
        <h3 className={Style.heading}>Добавить мероприятие</h3>
        <form onSubmit={formik.handleSubmit} className={Style.form}>
          <label className={Style.label}>
            Название
            <input
              type="text"
              name="title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              className={Style.input({
                border:
                  formik.touched.title && formik.errors.title
                    ? 'error'
                    : formik.touched.title && formik.values.title !== ''
                    ? 'success'
                    : 'default',
              })}
            />
            {formik.touched.title && formik.errors.title ? (
              <span className={Style.infoError}>{formik.errors.title}</span>
            ) : (
              <span className={Style.infoError} />
            )}
          </label>

          <label className={Style.label}>
            Дата и время
            <input
              type="datetime-local"
              min={new Date().toISOString().slice(0, -10) + '00'}
              name="startDateTime"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.startDateTime}
              className={Style.input({
                border:
                  formik.touched.startDateTime && formik.errors.startDateTime
                    ? 'error'
                    : formik.touched.startDateTime &&
                      formik.values.startDateTime !== ''
                    ? 'success'
                    : 'default',
              })}
            />
            {formik.touched.startDateTime && formik.errors.startDateTime ? (
              <span className={Style.infoError}>
                {formik.errors.startDateTime}
              </span>
            ) : (
              <span className={Style.infoError} />
            )}
          </label>

          <label className={Style.label}>
            Длительность (в днях)
            <input
              type="number"
              min="1"
              name="duration"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.duration}
              className={Style.input({
                border:
                  formik.touched.duration && formik.errors.duration
                    ? 'error'
                    : formik.touched.duration &&
                      formik.values.duration.toString() !== ''
                    ? 'success'
                    : 'default',
              })}
            />
            {formik.touched.duration && formik.errors.duration ? (
              <span className={Style.infoError}>{formik.errors.duration}</span>
            ) : (
              <span className={Style.infoError} />
            )}
          </label>

          <Suspense fallback={<h3 className={Style.heading}>Загрузка...</h3>}>
            <Await resolve={ranks}>
              {(resolvedRanks) => (
                <article className={Style.container}>
                  <p className={Style.item}>
                    <input
                      type="checkbox"
                      id="typeIndividual"
                      name="typeIndividual"
                      onChange={(e) => {
                        formik.handleChange(e);
                      }}
                      onBlur={formik.handleBlur}
                      checked={formik.values.typeIndividual}
                      className={Style.inputCheckbox}
                    />
                    <label
                      htmlFor="typeIndividual"
                      className={Style.labelCheckbox({ type: 'right' })}
                    >
                      Индивидуальная программа
                    </label>
                  </p>

                  {formik.values.typeIndividual ? (
                    <section className={Style.filter}>
                      {resolvedRanks.map((item: IRanks) => (
                        <p key={item.id} className={Style.ranks}>
                          <input
                            type="checkbox"
                            id={'individual ' + item.id.toString()}
                            name="masPartisipantsIndividualRanks"
                            value={item.id}
                            onChange={(e) => {
                              formik.handleChange(e);
                            }}
                            onBlur={formik.handleBlur}
                            className={Style.inputCheckbox}
                          />
                          <label
                            htmlFor={'individual ' + item.id.toString()}
                            className={Style.labelCheckbox()}
                          >
                            {EnumRank[item.title as keyof typeof EnumRank]}
                          </label>
                        </p>
                      ))}
                    </section>
                  ) : (
                    (formik.values.masPartisipantsIndividualRanks = [])
                  )}
                </article>
              )}
            </Await>
          </Suspense>

          <Suspense fallback={<h3 className={Style.heading}>Загрузка...</h3>}>
            <Await resolve={ranks}>
              {(resolvedRanks) => (
                <article className={Style.container}>
                  <p className={Style.item}>
                    <input
                      type="checkbox"
                      id="typeGroup"
                      name="typeGroup"
                      onChange={(e) => {
                        formik.handleChange(e);
                      }}
                      onBlur={formik.handleBlur}
                      checked={formik.values.typeGroup}
                      className={Style.inputCheckbox}
                    />
                    <label
                      htmlFor="typeGroup"
                      className={Style.labelCheckbox({ type: 'right' })}
                    >
                      Групповая программа
                    </label>
                  </p>
                  {formik.values.typeGroup ? (
                    <section className={Style.filter}>
                      {resolvedRanks.map((item: IRanks) => (
                        <p key={item.id} className={Style.ranks}>
                          <input
                            type="checkbox"
                            id={'group ' + item.id.toString()}
                            name="masPartisipantsGroupRanks"
                            value={item.id}
                            onChange={(e) => {
                              formik.handleChange(e);
                            }}
                            onBlur={formik.handleBlur}
                            className={Style.inputCheckbox}
                          />
                          <label
                            htmlFor={'group ' + item.id.toString()}
                            className={Style.labelCheckbox()}
                          >
                            {EnumRank[item.title as keyof typeof EnumRank]}
                          </label>
                        </p>
                      ))}
                    </section>
                  ) : (
                    (formik.values.masPartisipantsGroupRanks = [])
                  )}
                </article>
              )}
            </Await>
          </Suspense>

          <button type="submit" className={Style.button({})}>
            {spinner ? <Spinner top={0} left={0} /> : 'Создать'}
          </button>
        </form>

        <NavLink to="/event" className={Style.button({ type: 'secondary' })}>
          Отмена
        </NavLink>
      </section>
    </>
  );
};

async function getRanks() {
  return await utilClient.getRanks();
}

export const ranksLoaderForCreateEvent = async () => {
  const result = {
    ranks: getRanks(),
  };

  return defer(result);
};
