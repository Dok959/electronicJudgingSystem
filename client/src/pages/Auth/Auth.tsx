import { authClient } from '@/api/authClient';
import { redirect } from 'react-router-dom';
import * as Style from './Auth.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const AuthPage = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .email('Не корректный электронный адрес')
        .required('Обязательно'),
      password: Yup.string()
        .trim()
        .min(3, 'Минимум 3 знака')
        .max(15, 'Максимум 15 знаков')
        .required('Обязательно'),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;
      const result = await authClient.login(email, password);
      if (!result) {
        return null;
      }
      return redirect(`/primary`);
    },
  });

  return (
    <div>
      <img src="" alt="" />
      <form onSubmit={formik.handleSubmit}>
        <label>
          Почта
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <span>{formik.errors.email}</span>
          ) : null}
        </label>

        <br />

        <label>
          Пароль
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <span>{formik.errors.password}</span>
          ) : null}
        </label>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};
