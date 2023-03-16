import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { useStore } from 'effector-react';

import App from './App';
import { AuthPage, ErrorPage, EventPage } from './pages';
import { $auth, $grant } from './context/auth';
import { ranksLoader, reLoginLoader } from './loaders';
import { CreateEventPage } from './pages/Event/create';
import { dataLoader as eventLoader, EditEventPage } from './pages/Event/edit';

const Router = () => {
  reLoginLoader();
  const isLoggingIn = useStore($auth);
  const isHasRights = useStore($grant);

  console.log(isLoggingIn, isHasRights);

  const router1 = createBrowserRouter(
    createRoutesFromElements(
      // <Router>
      //   <Switch>
      //     <Route path="/account" component={Account} />
      //     <Route path="/contacts" component={Contacts} />
      //     <Route path="/inbox" component={Inbox} />
      //     <Route exact path="/" component={Home} />
      //     <Route component={Error404} />
      //   </Switch>
      // </Router>,
      <Route
        // exact
        path="/"
        element={<App />}
        errorElement={<ErrorPage />}
        loader={ranksLoader}
      >
        <Route
          path="event/:eventId(\d*)"
          element={isHasRights ? <EditEventPage /> : <div>печаль</div>}
          loader={eventLoader}
        />
        <Route
          path="event/create"
          element={isHasRights ? <CreateEventPage /> : <div>gsdf</div>}
          loader={ranksLoader}
        />
        <Route
          path="/event"
          element={isLoggingIn ? <EventPage /> : <Navigate to={'/'} />}
          loader={ranksLoader}
        />
      </Route>,
    ),
  );

  const router = createBrowserRouter(
    [
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
            path: 'event/:eventId',
            element: isHasRights ? <EditEventPage /> : <div>печаль</div>,
            loader: eventLoader,
          },
          {
            path: 'event/create',
            element: isHasRights ? <CreateEventPage /> : <div>gsdf</div>,
            loader: ranksLoader,
          },
          // {
          //   path: 'event',
          //   element: isLoggingIn ? <EventPage /> : <Navigate to={'/'} />,
          //   loader: ranksLoader,
          // },
          // {
          //   path: 'event/:contactId/edit',
          //   element: <EditContact />,
          // },
          {
            path: 'event',
            element: isLoggingIn ? <EventPage /> : <Navigate to={'/'} />,
            loader: ranksLoader,
          },
        ],
      },
    ],
    { basename: '/' },
  );

  return <RouterProvider router={router} />;
};

export default Router;
