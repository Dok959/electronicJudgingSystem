import { useEffect, useState } from 'react';
import { EventsList } from '@/components';
import { eventClient, roleClient } from '@/api';
import { IRanks, IRoles } from '@/types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Spinner } from '@/components';
import { handleAlertMessage } from '@/utils/auth';
import { EnumRank, alertStatus } from '@/utils/enum';
import * as Style from './Event.css';
import { redirect, useLoaderData } from 'react-router-dom';

export const EventPage = () => {
  const [role, setRole] = useState<IRoles | null>(null);
  useEffect(() => {
    async function getRole() {
      setRole(await roleClient.getRole());
    }
    getRole();
  }, []);

  const [isCreateForm, setIsCreateForm] = useState<boolean>(false);
  const clickHandler = () => {
    return setIsCreateForm(!isCreateForm);
  };
  useEffect(() => {
    if (isCreateForm === false && role?.title === 'Администратор') {
      const button = document.getElementById('create') as HTMLElement;
      button.style.display = 'flex';
      button.onclick = clickHandler;
    } else {
      const button = document.getElementById('create') as HTMLElement;
      button.style.display = 'none';
    }
  });

  const [spinner, setSpinner] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      title: '',
      startDateTime: '',
      duration: '1',
      typeIndividual: 'false',
      typeGroup: 'false',
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
      const { title, startDateTime, duration } = values;
      setSpinner(true);
      const result = await eventClient.create({
        title,
        startDateTime: new Date(startDateTime),
        duration: Number(duration),
      });
      if (!result) {
        setSpinner(false);
        handleAlertMessage({
          alertText: 'Не корректные данные',
          alertStatus: alertStatus.warning,
        });
        return null;
      }
      // redirect(`/event`);
      return handleAlertMessage({
        alertText: 'Соревнование создано',
        alertStatus: alertStatus.success,
      });
    },
  });

  const [expanded, setExpanded] = useState(false);
  // const ranks = Object.keys(EnumRank).map((key) => key);
  let ranks: IRanks[] = useLoaderData() as IRanks[];

  return (
    <>
      {isCreateForm ? (
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
                      : formik.touched.duration && formik.values.duration !== ''
                      ? 'success'
                      : 'default',
                })}
              />
              {formik.touched.duration && formik.errors.duration ? (
                <span className={Style.infoError}>
                  {formik.errors.duration}
                </span>
              ) : (
                <span className={Style.infoError} />
              )}
            </label>

            <article className="question">
              <label className={Style.label}>
                Индивидуальная программа
                <input
                  type="checkbox"
                  name="typeIndividual"
                  onChange={() => setExpanded(!expanded)}
                  onBlur={formik.handleBlur}
                  value={formik.values.typeIndividual}
                  className={Style.input({
                    border: 'default',
                  })}
                />
              </label>
              {expanded ? (
                <section>
                  {ranks.map((item) => (
                    <p key={item.id}>
                      <input
                        type="checkbox"
                        id={item.id.toString()}
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
                </section>
              ) : (
                <></>
              )}
            </article>

            <button type="submit" className={Style.button({})}>
              {spinner ? <Spinner top={0} left={0} /> : 'Создать'}
            </button>
          </form>
          <button
            onClick={clickHandler}
            className={Style.button({ type: 'secondary' })}
          >
            Отмена
          </button>
        </section>
      ) : (
        <>
          <EventsList />
        </>
      )}
    </>
  );
};
