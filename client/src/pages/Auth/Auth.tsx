import { authClient } from '@/api/authClient';
import { Form, redirect, useActionData } from 'react-router-dom';
import * as Style from './Auth.css';
import { useNavigate } from 'react-router-dom';

interface IErrors {
  email?: string;
  password?: string;
}

export async function action({ request }: any) {
  let formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');
  const errors: IErrors = {};

  // validate the fields
  if (typeof email !== 'string' || !email.includes('@')) {
    errors.email = "That doesn't look like an email address";
  }

  if (typeof password !== 'string' || password.length < 6) {
    errors.password = 'Password must be > 6 characters';
  }

  // return data if we have errors
  if (Object.keys(errors).length) {
    return errors;
  }

  const result = await authClient.login(email, password);
  if (!result) {
    return null;
  }
  return redirect(`/primary`);

  // const navigate = useNavigate();
  // switch (request.method) {
  //   case 'POST': {
  //     let formData = await request.formData();
  //     let email = formData.get('email');
  //     console.log(email);
  //     const result = await authClient.login(
  //       formData.get('email'),
  //       formData.get('password'),
  //     );
  //     if (!result) {
  //       return null;
  //     }
  //     return redirect(`/primary`);
  //     // navigate('/primary');
  //     // return fakeUpdateProject(name);
  //     // return null;
  //   }
  //   default: {
  //     throw new Response('', { status: 405 });
  //   }
  // }
}

export const AuthPage = () => {
  const navigate = useNavigate();
  const errors = useActionData() as IErrors;

  // const handler = async (email: string, password: string) => {
  //   if (!email || !password) {
  //     return;
  //   }

  //   const result = await authClient.login(email, password);

  //   if (!result) {
  //     return;
  //   }
  //   navigate('/primary');
  // };

  // const handleAuth = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   handler('temp@mail.ru', 'admin1');
  // };

  return (
    <div>
      <img src="" alt="" />
      <Form method="post">
        {/* onSubmit={handleAuth} */}
        <label>
          Почта
          <input type="email" name="email" />
          {errors?.email && <span>{errors.email}</span>}
        </label>
        <label>
          Пароль
          <input type="password" name="password" />
          {errors?.password && <span>{errors.password}</span>}
        </label>
        <button type="submit">Войти</button>
      </Form>
    </div>
  );
};
