import { Suspense, useCallback, useEffect, useState } from 'react';
import { eventClient, utilClient } from '@/api';
import { IEventAndSettings, IRanks } from '@/types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Spinner } from '@/components';
import { handleAlertMessage } from '@/utils/auth';
import { EnumRank, alertStatus } from '@/utils/enum';
import * as Style from './EditEvent.css';
import {

  Await,
  NavLink,
  defer,
  useAsyncValue,
  useLoaderData,
  useParams,
} from 'react-router-dom';
import { ILoadEventAndSettings, IRenderEventAndSettings } from './dto';

export interface IReturnTypes {
  event: IRenderEventAndSettings;
  ranks: IRanks[];
}

export interface IReturnTypesInit {
  data: {
    event: IRenderEventAndSettings;
    ranks: IRanks[];
  };
}

// TODO
const Event = () => {
  const { event, ranks } = useAsyncValue() as IReturnTypes;
  console.log(event, ranks);
  // const event = data.event; //useAsyncValue() as IRenderEventAndSettings;
  // console.log(data);
  // const event: IRenderEventAndSettings = data.event;
  // const ranks: IRanks[] = data.ranks;

  // const { event, ranks } = data;
  // const { event, ranks } = useAsyncValue() as IReturnTypes;
  // console.log(event);
  // console.log(event.title);

  // const ranks: any = [];
  // console.log(ranks);

  // const [spinner, setSpinner] = useState<boolean>(false);

  // const formik = useFormik({
  //   initialValues: { ...event },
  //   validationSchema: Yup.object({
  //     title: Yup.string()
  //       .trim()
  //       .required('Обязательно')
  //       .min(3, 'Укажите корректное название'),
  //     startDateTime: Yup.date()
  //       .required('Обязательно')
  //       .default(() => new Date())
  //       .min(
  //         new Date(new Date().toISOString().slice(0, -10) + '00'),
  //         'Дата или время не могут быть прошедшими',
  //       ),
  //     duration: Yup.number().default(1).min(1),
  //   }),
  //   onSubmit: async (values) => {
  //     const {
  //       title,
  //       startDateTime,
  //       duration,
  //       masPartisipantsIndividualRanks,
  //       masPartisipantsGroupRanks,
  //     } = values;
  //     setSpinner(true);
  //     return null;
  //   },
  // });

  return (
    <>
      <h5>dasdas</h5>
      {/* <section className={Style.wrapper}>
        <>{console.log(formik.values)}</>

  NavLink,
  redirect,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import { ILoadEventAndSettings, IRenderEventAndSettings } from './dto';

export async function dataLoader({ params }: any) {
  const event = await eventClient.getEvent(Number(params.eventId));
  if (event === null) {
    redirect('/event');
  }

  return event;
}

export const EditEventPage = () => {
  const initValue: IRenderEventAndSettings = {
    id: 1,
    title: '',
    startDateTime: new Date(),
    duration: 1,
    typeIndividual: false,
    masPartisipantsIndividualRanks: [],
    typeGroup: false,
    masPartisipantsGroupRanks: [],
  };
  const parser = (event: ILoadEventAndSettings) => {
    initValue.id = event.id;
    initValue.title = event.title;
    initValue.startDateTime = new Date(event.startDateTime);
    initValue.duration = event.duration;
    event.SettingsEvent.map((item) => {
      if (item.type.id === 1) {
        if (initValue.typeIndividual === false) {
          initValue.typeIndividual = true;
        }
        initValue.masPartisipantsIndividualRanks.push(String(item.rank.id));
      }
      if (item.type.id === 2) {
        if (initValue.typeGroup === false) {
          initValue.typeGroup = true;
        }
        initValue.masPartisipantsGroupRanks.push(String(item.rank.id));
      }
      return null;
    });
    return;
  };
  parser(useLoaderData() as ILoadEventAndSettings);

  const [spinner, setSpinner] = useState<boolean>(false);

  const [ranks, setRanks] = useState<IRanks[]>([]);

  const loadRanks = useCallback(async () => {
    setRanks(await utilClient.getRanks());
  }, []);

  useEffect(() => {
    loadRanks();
  }, [loadRanks]);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { ...initValue },
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
        id,
        title,
        startDateTime,
        duration,
        masPartisipantsIndividualRanks,
        masPartisipantsGroupRanks,
      } = values;
      setSpinner(true);
      const result = await eventClient.update({
        id,
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
        alertText: 'Соревнование обновлено',
        alertStatus: alertStatus.success,
      });
    },
  });

  return (
    <>
      <section className={Style.wrapper}>

        <h3 className={Style.heading}>Обновить мероприятие</h3>
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
              defaultValue={
                new Date(formik.values.startDateTime)
                  .toISOString()
                  .slice(0, -10) + '00'
              }
              className={Style.input({
                border:
                  formik.touched.startDateTime && formik.errors.startDateTime
                    ? 'error'
                    : formik.touched.startDateTime &&
                      formik.values.startDateTime?.toString() !== ''
                    ? 'success'
                    : 'default',
              })}
            />
            {formik.touched.startDateTime && formik.errors.startDateTime ? (

              <span className={Style.infoError}></span>
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
                      formik.values.duration?.toString() !== ''
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
                {ranks.map((item: any) => (
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
                      checked={Boolean(
                        formik.values.masPartisipantsIndividualRanks?.filter(
                          (el) => el === item.id,
                        ).length,
                      )}
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

                {ranks.map((item: any) => (
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
                      
                      checked={Boolean(
                        formik.values.masPartisipantsGroupRanks?.filter(
                          (el) => el === item.id,
                        ).length,
                      )}
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
            {spinner ? <Spinner top={0} left={0} /> : 'Сохранить'}
          </button>
        </form>

        <NavLink to="/event" className={Style.button({ type: 'secondary' })}>
          Отмена
        </NavLink>

      </section> */}
    </>
  );
};

export const EditEventPage = () => {
  const { data } = useLoaderData() as IReturnTypesInit;
  console.log(data);

  return (
    <>
      <Suspense fallback={<h3 className={Style.heading}>Загрузка...</h3>}>
        <Await resolve={data}>
          <Event />
        </Await>
      </Suspense>
    </>
  );
};

async function getEvent(id: number) {
  const event = await eventClient.getEvent(id);

  const masPartisipantsIndividualRanks =
    event?.SettingsEvent.filter((el) => el.type.id === 1).map(
      (el) => el.rank.id,
    ) || [];

  const masPartisipantsGroupRanks =
    event?.SettingsEvent.filter((el) => el.type.id === 2).map(
      (el) => el.rank.id,
    ) || [];

  return {
    id: event?.id,
    title: event?.title,
    startDateTime: event?.startDateTime,
    duration: event?.duration,
    masPartisipantsIndividualRanks: masPartisipantsIndividualRanks,
    typeIndividual: Boolean(masPartisipantsIndividualRanks.length),
    masPartisipantsGroupRanks: masPartisipantsGroupRanks,
    typeGroup: Boolean(masPartisipantsGroupRanks.length),
  };
}

async function getRanks() {
  return await utilClient.getRanks();
}

export const eventLoader = async ({ params }: any) => {
  const id = Number(params.id);

  const result = {
    event: getEvent(id),
    ranks: getRanks(),
  };

  return defer({ data: result });
};
