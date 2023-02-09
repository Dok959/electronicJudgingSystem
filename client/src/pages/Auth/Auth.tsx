import * as Style from './Auth.css';

export const AuthPage = () => {
  return (
    <div>
      <img src="" alt="" />
      <form>
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
