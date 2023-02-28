import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { useStore } from 'effector-react';

import App from './App';
import { AuthPage, ErrorPage, EventPage, HomePage } from './pages';
import { $auth } from './context/auth';
import { ranksLoader, reLoginLoader } from './loaders';

const Router = () => {
  const isLoggingIn = useStore($auth);
  reLoginLoader();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<App />}
        errorElement={<ErrorPage />}
        loader={ranksLoader}
      >
        <Route
          path="login"
          // redirect => /home
          element={isLoggingIn ? <Navigate to={'/event'} /> : <AuthPage />}
          // loader={reLoginLoader}
        />
        <Route
          path="home"
          element={isLoggingIn ? <HomePage /> : <Navigate to={'/'} />}
          // loader={ranksLoader}
        />
        <Route
          path="event"
          element={isLoggingIn ? <EventPage /> : <Navigate to={'/'} />}
          loader={ranksLoader}
        />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
};

export default Router;
