import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { useStore } from 'effector-react';

import App from './App';
import { AuthPage, ErrorPage, EventPage } from './pages';
import { $auth, $grant } from './context/auth';
import { ranksLoader, reLoginLoader } from './loaders';
import { CreateEventPage } from './pages/Event/create';

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
          element: isLoggingIn ? <Navigate to={'/event'} /> : <AuthPage />,
        },
        {
          path: 'event',
          element: isLoggingIn ? <EventPage /> : <Navigate to={'/'} />,
          loader: ranksLoader,
        },
        {
          path: 'event/create',
          element: isHasRights ? <CreateEventPage /> : <div>gsdf</div>,
          loader: ranksLoader,
        },
        {
          path: 'event/:eventId',
          element: isLoggingIn ? (
            <div>страница мероприятия</div>
          ) : (
            <div>печаль</div>
          ),
        },
        // {
        //   path: 'event/:contactId/edit',
        //   element: <EditContact />,
        // },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
