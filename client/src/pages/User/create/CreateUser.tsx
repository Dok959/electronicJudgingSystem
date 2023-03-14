import { useState } from 'react';
import { eventClient, roleClient } from '@/api';
import { IRanks, IRoles } from '@/types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Spinner } from '@/components';
import { handleAlertMessage } from '@/utils/auth';
import { EnumRank, alertStatus } from '@/utils/enum';
import * as Style from './CreateUser.css';
import { NavLink, useLoaderData, useNavigate } from 'react-router-dom';

export async function rolesLoader() {
  return await roleClient.getRoles();
}

export const CreateUserPage = () => {
  const roles: IRoles[] = useLoaderData() as IRoles[];

  const [spinner, setSpinner] = useState<boolean>(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      surname: '',
      name: '',
      patronymic: '',
      email: '',
      password: '',
      roleId: 0,
    },
    validationSchema: Yup.object({
      surname: Yup.string()
        .trim()
        .required('Обязательно')
        .min(3, 'Укажите корректную фамилию'),
      name: Yup.string()
        .trim()
        .required('Обязательно')
        .min(3, 'Укажите корректное имя'),
      patronymic: Yup.string().trim().min(3, 'Укажите корректное отчество'),
      email: Yup.string()
        .trim()
        .required('Обязательно')
        .email('Не корректный электронный адрес'),
      password: Yup.string()
        .trim()
        .required('Обязательно')
        // .matches(/^(?=.*[a-z])/, 'Обязательны сточные буквы')
        // .matches(/^(?=.*[A-Z])/, 'Обязательны большие буквы')
        // .matches(/^(?=.*[0-9])/, 'Обязательны цифры')
        // .matches(/^(?=.*[!@#$%^&*])/, 'Обязательны спецсимволы')
        .min(3, 'Минимум 3 знака')
        .max(15, 'Максимум 15 знаков'),
    }),
    onSubmit: async (values) => {
      console.log(values);
      // const { title, startDateTime, duration } = values;
      setSpinner(true);
      // const result = await eventClient.create({
      //   title,
      //   startDateTime: new Date(startDateTime),
      //   duration: Number(duration),
      //   typeIndividual: 1,
      //   masPartisipantsIndividualRanks: masPartisipantsIndividualRanks.map(
      //     (item) => Number(item),
      //   ),
      //   typeGroup: 2,
      //   masPartisipantsGroupRanks: masPartisipantsGroupRanks.map((item) =>
      //     Number(item),
      //   ),
      // });
      // setSpinner(false);
      // if (!result) {
      //   handleAlertMessage({
      //     alertText: 'Не корректные данные',
      //     alertStatus: alertStatus.warning,
      //   });
      //   return null;
      // }
      // navigate('/event');
      // return handleAlertMessage({
      //   alertText: 'Соревнование создано',
      //   alertStatus: alertStatus.success,
      // });
    },
  });

  return (
    <>
      <section className={Style.wrapper}>
        <h3 className={Style.heading}>Добавить пользователя</h3>
        <form onSubmit={formik.handleSubmit} className={Style.form}>
          <label className={Style.label}>
            Фамилия
            <input
              type="text"
              name="surname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.surname}
              className={Style.input({
                border:
                  formik.touched.surname && formik.errors.surname
                    ? 'error'
                    : formik.touched.surname && formik.values.surname !== ''
                    ? 'success'
                    : 'default',
              })}
            />
            {formik.touched.surname && formik.errors.surname ? (
              <span className={Style.infoError}>{formik.errors.surname}</span>
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
            Почта
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={Style.input({
                border:
                  formik.touched.email && formik.errors.email
                    ? 'error'
                    : formik.touched.email && formik.values.email !== ''
                    ? 'success'
                    : 'default',
              })}
            />
            {formik.touched.email && formik.errors.email ? (
              <span className={Style.infoError}>{formik.errors.email}</span>
            ) : (
              <span className={Style.infoError} />
            )}
          </label>

          <label className={Style.label}>
            Пароль
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={Style.input({
                border:
                  formik.touched.password && formik.errors.password
                    ? 'error'
                    : formik.touched.password && formik.values.password !== ''
                    ? 'success'
                    : 'default',
              })}
            />
            {formik.touched.password && formik.errors.password ? (
              <span className={Style.infoError}>{formik.errors.password}</span>
            ) : (
              <span className={Style.infoError} />
            )}
          </label>

          {roles.length ? (
            <article className={Style.container}>
              {roles.map((item) => (
                <>
                  <input
                    type="radio"
                    id={`roleId${item.id}`}
                    name="roleId"
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                    onBlur={formik.handleBlur}
                    defaultChecked={true}
                    value={item.id}
                    className={Style.inputRadio}
                  />
                  <label
                    htmlFor={`roleId${item.id}`}
                    className={Style.labelRadio}
                  >
                    {item.title}
                  </label>
                </>
              ))}
            </article>
          ) : (
            <></>
          )}
          {/* <input
              type="radio"
              id="roleIdUser"
              name="roleId"
              onChange={(e) => {
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
              defaultChecked={true}
              value={roles.}
              className={Style.inputRadio}
            />
            <label htmlFor="roleIdUser" className={Style.labelRadio}>
              Пользователь
            </label>

            <input
              type="radio"
              id="roleIdAdmin"
              name="roleId"
              onChange={(e) => {
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
              defaultChecked={false}
              value={1}
              className={Style.inputRadio}
            />
            <label htmlFor="roleIdAdmin" className={Style.labelRadio}>
              Администратор
            </label>
          </article> */}

          <button type="submit" className={Style.button({})}>
            {spinner ? <Spinner top={0} left={0} /> : 'Создать'}
          </button>
        </form>

        <NavLink to="/home" className={Style.button({ type: 'secondary' })}>
          Отмена
        </NavLink>
      </section>
    </>
  );
};
