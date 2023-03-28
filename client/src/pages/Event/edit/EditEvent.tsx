import { Suspense, useState } from 'react';
import {
  Await,
  NavLink,
  defer,
  useAsyncValue,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { eventClient, utilClient } from '@/api';
import { IRanks } from '@/types';
import { Spinner } from '@/components';
import { handleAlertMessage } from '@/utils/auth';
import { EnumRank, alertStatus } from '@/utils/enum';
import { IRenderEventAndSettings } from './dto';
import * as Style from './EditEvent.css';

export interface IReturnTypes {
  event: IRenderEventAndSettings;
  ranks: IRanks[];
}

export interface IRenderProps {
  ranks: IRanks[];
}

// TODO
const Event = (props: IRenderProps) => {
  const event = useAsyncValue() as IRenderEventAndSettings;
  const ranks: IRanks[] = props.ranks;
  const navigate = useNavigate();

  const [spinner, setSpinner] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: { ...event },
    validationSchema: Yup.object({
      title: Yup.string()
        .trim()
        .required('Обязательно')
        .min(3, 'Укажите корректное название'),
      startDateTime: Yup.date()
        .required('Обязательно')
        .default(() => new Date())
        .min(
          new Date().toISOString(),
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
    <section className={Style.wrapper}>
      <>{console.log(formik.values)}</>
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
            min={new Date().toISOString().slice(0, -8)}
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
              <Suspense
                fallback={<h3 className={Style.heading}>Загрузка...</h3>}
              >
                <Await resolve={ranks}>
                  {(resolvedRanks) => (
                    <>
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
                    </>
                  )}
                </Await>
              </Suspense>
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
              <Suspense
                fallback={<h3 className={Style.heading}>Загрузка...</h3>}
              >
                <Await resolve={ranks}>
                  {(resolvedRanks) => (
                    <>
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
                    </>
                  )}
                </Await>
              </Suspense>
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
    </section>
  );
};

export const EditEventPage = () => {
  const { event, ranks } = useLoaderData() as IReturnTypes;

  return (
    <>
      <Suspense fallback={<h3 className={Style.heading}>Загрузка...</h3>}>
        <Await resolve={event}>
          <Event ranks={ranks} />
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
    startDateTime: event?.startDateTime.toString().slice(0, -5),
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

  return defer(result);
};
