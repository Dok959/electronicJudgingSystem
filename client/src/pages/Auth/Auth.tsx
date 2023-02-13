import { authClient } from '@/api/authClient';
import { redirect } from 'react-router-dom';
import * as Style from './Auth.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { Spinner } from '@/components/Spinner/Spinner';

export const AuthPage = () => {
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
      if (!result) {
        setSpinner(false);
        return null;
      }
      return redirect(`/primary`);
    },
  });

  return (
    <>
      <h3 className={Style.mainTitle}>Электронное судейство соревнований</h3>
      <div className={Style.wrapper}>
        <img src="/images/first.jpg" alt="" className={Style.image} />
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
