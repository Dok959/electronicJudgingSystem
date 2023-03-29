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
import { utilClient, userClient } from '@/api';
import { IRoles } from '@/types';
import { Spinner } from '@/components';
import { handleAlertMessage } from '@/utils/auth';
import { alertStatus } from '@/utils/enum';
import * as Style from './CreateUser.css';
import { ICustomPropertyCreateUser } from '@/types/user';

export async function rolesLoaderForCreateUser() {
  const result = {
    roles: getRoles(),
  };

  return defer(result);
}
async function getRoles() {
  return await utilClient.getRoles();
}

export interface IReturnTypes {
  roles: IRoles[];
}

// END TODO: включить остаток валидационных правил
export const CreateUserPage = () => {
  const { roles } = useLoaderData() as IReturnTypes;

  const [spinner, setSpinner] = useState<boolean>(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      sirname: '',
      name: '',
      patronymic: '',
      email: '',
      password: '',
      roleId: 1,
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
    onSubmit: async (values: ICustomPropertyCreateUser) => {
      values.roleId = Number(values.roleId);
      setSpinner(true);
      if (await userClient.createUser(values)) {
        navigate('/users');
        return handleAlertMessage({
          alertText: 'Пользователь добавлен',
          alertStatus: alertStatus.success,
        });
      }
      setSpinner(false);
      return handleAlertMessage({
        alertText: 'Не корректные данные',
        alertStatus: alertStatus.warning,
      });
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

          <Suspense fallback={<h3 className={Style.heading}>Загрузка...</h3>}>
            <Await resolve={roles}>
              {(resolvedRoles) => (
                <article className={Style.container}>
                  {resolvedRoles.map((item: IRoles, index: number) => (
                    <Fragment key={index}>
                      <input
                        type="radio"
                        id={`roleId${item.id}`}
                        name="roleId"
                        onChange={(e) => {
                          formik.values.roleId = item.id;
                          formik.handleChange(e);
                        }}
                        onBlur={formik.handleBlur}
                        defaultChecked={
                          item.title === 'Пользователь' ? true : false
                        }
                        value={item.id}
                        className={Style.inputRadio}
                      />
                      <label
                        htmlFor={`roleId${item.id}`}
                        className={Style.labelRadio}
                      >
                        {item.title}
                      </label>
                    </Fragment>
                  ))}
                </article>
              )}
            </Await>
          </Suspense>

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
