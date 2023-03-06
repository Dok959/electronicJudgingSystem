import { useEffect, useState } from 'react';
import { EventsList } from '@/components';
import { eventClient, roleClient, utilClient } from '@/api';
import { IRanks, IRoles, ITypes } from '@/types';
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
      typeIndividual: '1',
      masPartisipantsIndividualRanks: [],
      typeGroup: '2',
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
        typeIndividual,
        masPartisipantsIndividualRanks,
        typeGroup,
        masPartisipantsGroupRanks,
      } = values;
      setSpinner(true);
      const result = await eventClient.create({
        title,
        startDateTime: new Date(startDateTime),
        duration: Number(duration),
        typeIndividual: Number(typeIndividual),
        masPartisipantsIndividualRanks: masPartisipantsIndividualRanks.map(
          (item) => Number(item),
        ),
        typeGroup: Number(typeGroup),
        masPartisipantsGroupRanks: masPartisipantsGroupRanks.map((item) =>
          Number(item),
        ),
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

  const [individualRanks, setIndividualRanks] = useState(false);
  const [groupRanks, setGroupRanks] = useState(false);
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

            <article className={Style.container}>
              <p className={Style.item}>
                <input
                  type="checkbox"
                  id="typeIndividual"
                  name="typeIndividual"
                  onChange={(e) => {
                    setIndividualRanks(!individualRanks);
                    formik.handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                  value={1}
                  defaultChecked={false}
                  className={Style.inputCheckbox}
                />
                <label
                  htmlFor="typeIndividual"
                  className={Style.labelCheckbox({ type: 'right' })}
                >
                  Индивидуальная программа
                </label>
              </p>
              {individualRanks ? (
                <section className={Style.filter}>
                  {ranks.map((item) => (
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
                <>{(formik.values.masPartisipantsIndividualRanks = [])}</>
              )}
            </article>

            <article className={Style.container}>
              <p className={Style.item}>
                <input
                  type="checkbox"
                  id="typeGroup"
                  name="typeGroup"
                  onChange={(e) => {
                    setGroupRanks(!groupRanks);
                    formik.handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                  value={2}
                  defaultChecked={false}
                  className={Style.inputCheckbox}
                />
                <label
                  htmlFor="typeGroup"
                  className={Style.labelCheckbox({ type: 'right' })}
                >
                  Групповая программа
                </label>
              </p>
              {groupRanks ? (
                <section className={Style.filter}>
                  {ranks.map((item) => (
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
                <>{(formik.values.masPartisipantsGroupRanks = [])}</>
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
