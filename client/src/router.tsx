import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { useStore } from 'effector-react';

import App from './App';
import { AuthPage, ErrorPage, EventPage, HomePage } from './pages';
import { $auth, $grant } from './context/auth';
import { ranksLoader, reLoginLoader } from './loaders';
import { CreateEventPage } from './pages/Event/create';
import { dataLoader as eventLoader, EditEventPage } from './pages/Event/edit';
import { CreateUserPage } from './pages/User/create';
import { rolesLoader } from './pages/User/create/CreateUser';

const Router = () => {
  const isLoggingIn = useStore($auth);
  const isHasRights = useStore($grant);
  reLoginLoader();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
      loader: ranksLoader,
      children: [
        {
          path: 'login',
          element: isLoggingIn ? <Navigate to={'/home'} /> : <AuthPage />,
        },
        {
          path: 'home',
          element: isLoggingIn ? <HomePage /> : <Navigate to={'/'} />,
        },
        {
          path: 'event',
          element: isLoggingIn ? <EventPage /> : <Navigate to={'/home'} />,
          loader: ranksLoader,
        },
        {
          path: 'event/create',
          element: isHasRights ? (
            <CreateEventPage />
          ) : (
            <Navigate to={'/event'} />
          ),
          loader: ranksLoader,
        },
        {
          path: 'event/:eventId',
          element: isHasRights ? <EditEventPage /> : <Navigate to={'/event'} />,
          loader: eventLoader,
        },
        {
          path: 'user/create',
          element: isHasRights ? <CreateUserPage /> : <Navigate to={'/home'} />,
          loader: rolesLoader,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
