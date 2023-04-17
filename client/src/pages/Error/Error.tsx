import { useRouteError } from 'react-router-dom';

export const ErrorPage = () => {
  const error = useRouteError() as any;
  console.error(error);

  return (
    <div id="error-page">
      <h1>Что-то пошло не так</h1>
      <p>Извините произошла ошибка, повторите попытку позднее</p>
      <p>
        <i>{error.status}</i>
        <br />
        <i>{error.statusText}</i>
      </p>
    </div>
  );
};
