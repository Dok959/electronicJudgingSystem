import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { useStore } from 'effector-react';

import { AuthPage, ErrorPage, EventPage, HomePage, MainPage } from './pages';
import { $auth, $grant } from './context/auth';
// import { ranksLoader, reLoginLoader } from './loaders';
import {
  CreateEventPage,
  ranksLoaderForCreateEvent,
} from './pages/Event/create';
import { EditEventPage, eventLoader } from './pages/Event/edit';
import { Aboutpage } from './pages/TestPages/Aboutpage';
import { Blogpage } from './pages/TestPages/Blogpage';
import { Createpost } from './pages/TestPages/Createpost';
import { Editpost } from './pages/TestPages/Editpost';
// import { Mainpage } from './pages/TestPages/Mainpage';
import { Notfoundpage } from './pages/TestPages/Notfoundpage';
import { Singlepage } from './pages/TestPages/Singlepage';
import { Layout } from './components/Layout/Layout';
import { useTheme } from './hooks';
// import { MainPage, ranksLoader } from './pages/Main/Main';
import { ranksLoader } from './components/EventsList';
import { reLoginLoader } from './pages/Auth';
import { RequireAuth, RequireRights } from './hoc';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      <Route index element={<MainPage />} loader={ranksLoader} />
      <Route path="login" element={<AuthPage />} loader={reLoginLoader} />
      <Route
        path="home"
        element={
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        }
      />
      <Route
        path="events"
        element={
          <RequireAuth>
            <EventPage />
          </RequireAuth>
        }
        loader={ranksLoader}
      />
      <Route
        path="events/:id"
        element={<Navigate replace to={'/events/:id/edit'} />}
      />
      <Route
        path="events/:id/edit"
        element={
          <RequireAuth>
            <EditEventPage />
          </RequireAuth>
        }
        loader={eventLoader}
      />
      <Route
        path="events/new/"
        element={
          <RequireRights>
            <CreateEventPage />
          </RequireRights>
        }
        loader={ranksLoaderForCreateEvent}
      />
      <Route
        path="events/new/edit"
        element={<Navigate replace to="/events/new" />}
      />
      <Route path="*" element={<Notfoundpage />} />
    </Route>,
  ),
);

const Router = () => {
  const { theme } = useTheme();

  document.getElementById('root')!.classList.add(theme);

  return <RouterProvider router={router} />;
};

export default Router;
