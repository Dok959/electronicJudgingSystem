import { Suspense, useEffect, useState } from 'react';
import {
  Await,
  Navigate,
  defer,
  useAsyncValue,
  useLoaderData,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useStore } from 'effector-react';

import { authClient } from '@/api/authClient';
import { Spinner } from '@/components';
import { handleAlertMessage } from '@/utils/auth';
import { alertStatus } from '@/utils/enum';
import { $auth } from '@/context/auth';

import * as Style from './Auth.css';

export interface IReturnTypes {
  login: boolean;
}

// END TODO: включить остаток валидационных правил
// TODO: кнопка забыл пароль
const AuthContent = () => {
  const login = useAsyncValue() as IReturnTypes;
  const isLoggingIn: boolean = useStore($auth);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (login || isLoggingIn) {
      <Navigate to={location.pathname} state={{ from: location }} />;
    }
  }, [isLoggingIn, location, login, navigate]);

  const [spinner, setSpinner] = useState<boolean>(false);
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);

  const handlerTogglePassword = () => {
    const password = document.querySelector('#password');
    const type =
      password?.getAttribute('type') === 'password' ? 'text' : 'password';
    password?.setAttribute('type', type);
    setVisiblePassword(!visiblePassword);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
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
      const { email, password } = values;
      setSpinner(true);
      const result = await authClient.login(email, password);
      setSpinner(false);
      if (!result) {
        handleAlertMessage({
          alertText: 'Не корректные данные',
          alertStatus: alertStatus.warning,
        });
        return null;
      }

      navigate(`/events`);
      return handleAlertMessage({
        alertText: 'Вход выполнен',
        alertStatus: alertStatus.success,
      });
    },
  });

  return (
    <>
      <h3 className={Style.mainTitle}>Электронное судейство соревнований</h3>
      <div className={Style.wrapper}>
        <img src="/images/3.jpg" alt="" className={Style.image} />
        <form onSubmit={formik.handleSubmit} className={Style.formLogin}>
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
              id="password"
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

          <div id="togglePassword" onClick={handlerTogglePassword}>
            {visiblePassword ? (
              <img src="/images/CloseEye.svg" className={Style.eye} alt="" />
            ) : (
              <img src="/images/OpenEye.svg" className={Style.eye} alt="" />
            )}
          </div>

          <button type="submit" className={Style.button}>
            {spinner ? <Spinner top={0} left={0} /> : 'Войти'}
          </button>
        </form>
      </div>
      {/* <a href="#">Забыли пароль?</a> */}
    </>
  );
};

export const AuthPage = () => {
  const { login } = useLoaderData() as IReturnTypes;
  // let isLoggingIn: boolean = useStore($auth);

  // const navigate = useNavigate();
  // const location = useLocation();

  // useEffect(() => {
  //   console.log(login);
  //   console.log(login || isLoggingIn);
  //   if (login || isLoggingIn) {
  //     setAuth(true);
  //     <Navigate to={location.pathname} state={{ from: location }} />;
  //   }
  // }, [isLoggingIn, location, login, navigate]);

  // const [spinner, setSpinner] = useState<boolean>(false);
  // const [visiblePassword, setVisiblePassword] = useState<boolean>(false);

  // const handlerTogglePassword = () => {
  //   const password = document.querySelector('#password');
  //   const type =
  //     password?.getAttribute('type') === 'password' ? 'text' : 'password';
  //   password?.setAttribute('type', type);
  //   setVisiblePassword(!visiblePassword);
  // };

  return (
    <Suspense fallback={<h3>Загрузка...</h3>}>
      <Await resolve={login}>
        <AuthContent />
      </Await>
    </Suspense>
  );
};

async function login() {
  return await authClient.reLogin();
}

export const reLoginLoader = async () => {
  const result = {
    login: login(),
  };

  return defer(result);
};
