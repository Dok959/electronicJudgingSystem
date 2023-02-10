import { authClient } from '@/api/authClient';
import * as Style from './Auth.css';
import { useNavigate } from 'react-router-dom';

export const AuthPage = () => {
  const navigate = useNavigate();

  const handler = async (email: string, password: string) => {
    if (!email || !password) {
      return;
    }

    const result = await authClient.login(email, password);

    if (!result) {
      return;
    }
    navigate('/primary');
  };

  const handleAuth = (event: React.FormEvent) => {
    event.preventDefault();
    handler('temp@mail.ru', 'admin');
  };

  return (
    <div>
      <img src="" alt="" />
      <form onSubmit={handleAuth}>
        <label>
          Почта
          <input type="email" />
        </label>
        <label>
          Пароль
          <input type="password" />
        </label>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};
