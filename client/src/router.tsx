import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { useStore } from 'effector-react';

import App from './App';
import { AuthPage, ErrorPage } from './pages';
import { $auth } from './context/auth';
import { eventClient } from './api/eventClient';

export async function eventsloader({ request }: any) {
  console.log(request.body);
  return await eventClient.getEvents([]);
}

// https://runebook.dev/ru/docs/react_router/components/form
const Router = () => {
  const isLoggingIn = useStore($auth);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<App />}
        errorElement={<ErrorPage />}
        loader={eventsloader}
      >
        <Route
          path="login"
          element={isLoggingIn ? <Navigate to={'/primary'} /> : <AuthPage />}
        />
        <Route
          path="five"
          element={isLoggingIn ? <h2>Five</h2> : <Navigate to={'/'} />}
        />
        <Route
          path="primary"
          element={<h2>Вы авторизованы: Страница Home</h2>}
        />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
};

export default Router;
