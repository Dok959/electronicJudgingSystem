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
import { rankClient } from './api/rankClient';

export async function ranksloader() {
  return await rankClient.getRanks();
}

const Router = () => {
  const isLoggingIn = useStore($auth);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<App />}
        errorElement={<ErrorPage />}
        loader={ranksloader}
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
