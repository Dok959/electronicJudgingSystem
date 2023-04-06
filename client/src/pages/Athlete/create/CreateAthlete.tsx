import { Suspense, useState, Fragment } from 'react';
import {
  Await,
  NavLink,
  defer,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { athleteClient, utilClient } from '@/api';
import { IRanks } from '@/types';
import { Spinner } from '@/components';
import { handleAlertMessage } from '@/utils/auth';
import { EnumRank, alertStatus } from '@/utils/enum';
import * as Style from './CreateAthlete.css';
import { ICustomPropertyCreateUser } from '@/types/user';

export async function ranksLoaderForCreateAthlete() {
  const result = {
    ranks: getRanks(),
  };

  return defer(result);
}
async function getRanks() {
  return await utilClient.getRanks();
}

export interface IReturnTypes {
  ranks: IRanks[];
}

export const CreateAthletePage = () => {
  const { ranks } = useLoaderData() as IReturnTypes;

  const [spinner, setSpinner] = useState<boolean>(false);
  const navigate = useNavigate();

  const formik: any = useFormik({
    initialValues: {
      sirname: '',
      name: '',
      patronymic: '',
      dateOfBirth: '',
      rankId: 1,
    },
    validationSchema: Yup.object({
      sirname: Yup.string()
        .trim()
        .required('Обязательно')
        .min(3, 'Укажите корректную фамилию'),
      name: Yup.string()
        .trim()
        .required('Обязательно')
        .min(3, 'Укажите корректное имя'),
      patronymic: Yup.string().trim().min(3, 'Укажите корректное отчество'),
      dateOfBirth: Yup.date()
        .default(() => new Date())
        .max(new Date().toISOString(), 'Дата или время не могут быть будущими'),
    }),
    onSubmit: async (values) => {
      // values.roleId = Number(values.roleId);
      setSpinner(true);
      const athlete = await athleteClient.createAthlete(values);
      // if (await userClient.createUser(values)) {
      //   navigate('/users');
      //   return handleAlertMessage({
      //     alertText: 'Пользователь добавлен',
      //     alertStatus: alertStatus.success,
      //   });
      // }
      setSpinner(false);
      // return handleAlertMessage({
      //   alertText: 'Не корректные данные',
      //   alertStatus: alertStatus.warning,
      // });
    },
  });

  return (
    <>
      <section className={Style.wrapper}>
        <h3 className={Style.heading}>Добавить ученика</h3>
        <form onSubmit={formik.handleSubmit} className={Style.form}>
          <label className={Style.label}>
            Фамилия
            <input
              type="text"
              name="sirname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.sirname}
              className={Style.input({
                border:
                  formik.touched.sirname && formik.errors.sirname
                    ? 'error'
                    : formik.touched.sirname && formik.values.sirname !== ''
                    ? 'success'
                    : 'default',
              })}
            />
            {formik.touched.sirname && formik.errors.sirname ? (
              <span className={Style.infoError}>{formik.errors.sirname}</span>
            ) : (
              <span className={Style.infoError} />
            )}
          </label>

          <label className={Style.label}>
            Имя
            <input
              type="text"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className={Style.input({
                border:
                  formik.touched.name && formik.errors.name
                    ? 'error'
                    : formik.touched.name && formik.values.name !== ''
                    ? 'success'
                    : 'default',
              })}
            />
            {formik.touched.name && formik.errors.name ? (
              <span className={Style.infoError}>{formik.errors.name}</span>
            ) : (
              <span className={Style.infoError} />
            )}
          </label>

          <label className={Style.label}>
            Отчество
            <input
              type="text"
              name="patronymic"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.patronymic}
              className={Style.input({
                border:
                  formik.touched.patronymic && formik.errors.patronymic
                    ? 'error'
                    : formik.touched.patronymic &&
                      formik.values.patronymic !== ''
                    ? 'success'
                    : 'default',
              })}
            />
            {formik.touched.patronymic && formik.errors.patronymic ? (
              <span className={Style.infoError}>
                {formik.errors.patronymic}
              </span>
            ) : (
              <span className={Style.infoError} />
            )}
          </label>

          <label className={Style.label}>
            Дата и время
            <input
              type="date"
              max={new Date().toISOString().slice(0, -14)}
              name="dateOfBirth"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.dateOfBirth}
              className={Style.input({
                border:
                  formik.touched.dateOfBirth && formik.errors.dateOfBirth
                    ? 'error'
                    : formik.touched.dateOfBirth &&
                      formik.values.dateOfBirth !== ''
                    ? 'success'
                    : 'default',
              })}
            />
            {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
              <span className={Style.infoError}>
                {formik.errors.dateOfBirth}
              </span>
            ) : (
              <span className={Style.infoError} />
            )}
          </label>

          <Suspense fallback={<h3 className={Style.heading}>Загрузка...</h3>}>
            <Await resolve={ranks}>
              {(resolvedRanks) => (
                <article className={Style.container}>
                  <section className={Style.filter}>
                    {resolvedRanks.map((item: IRanks, index: number) => (
                      <p key={item.id} className={Style.ranks}>
                        <input
                          type="radio"
                          id={`rankId${item.id}`}
                          name="rankId"
                          onChange={(e) => {
                            formik.values.rankId = item.id;
                            formik.handleChange(e);
                          }}
                          onBlur={formik.handleBlur}
                          defaultChecked={
                            item.title === 'Без разряда' ? true : false
                          }
                          value={item.id}
                          className={Style.inputRadio}
                        />
                        <label
                          htmlFor={`rankId${item.id}`}
                          className={Style.labelRadio}
                        >
                          {EnumRank[item.title as keyof typeof EnumRank]}
                        </label>
                      </p>
                    ))}
                  </section>
                </article>
              )}
            </Await>
          </Suspense>

          <button type="submit" className={Style.button({})}>
            {spinner ? <Spinner top={0} left={0} /> : 'Создать'}
          </button>
        </form>

        <NavLink to="/athletes" className={Style.button({ type: 'secondary' })}>
          Отмена
        </NavLink>
      </section>
    </>
  );
};
