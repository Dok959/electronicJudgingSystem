import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import {
  AuthPage,
  ErrorPage,
  EventPage,
  HomePage,
  MainPage,
  NotFoundPage,
  UserPage,
} from './pages';
import {
  CreateEventPage,
  ranksLoaderForCreateEvent,
} from './pages/Event/create';
import { EditEventPage, eventLoader } from './pages/Event/edit';
import { Layout } from './components/Layout/Layout';
import { useTheme } from './hooks';
import { ranksLoader } from './components/EventsList';
import { reLoginLoader } from './pages/Auth';
import { RequireAuth, RequireRights } from './hoc';
import { CreateUserPage, rolesLoaderForCreateUser } from './pages/User/create';
import { AthletesPage } from './pages/Athlete';
import {
  CreateAthletePage,
  ranksLoaderForCreateAthlete,
} from './pages/Athlete/create';

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
      <Route
        path="users"
        element={
          <RequireRights>
            <UserPage />
          </RequireRights>
        }
      />
      <Route
        path="users/new/"
        element={
          <RequireRights>
            <CreateUserPage />
          </RequireRights>
        }
        loader={rolesLoaderForCreateUser}
      />
      <Route
        path="athletes"
        element={
          <RequireAuth>
            <AthletesPage />
          </RequireAuth>
        }
      />
      <Route
        path="athletes/new/"
        element={
          <RequireAuth>
            <CreateAthletePage />
          </RequireAuth>
        }
        loader={ranksLoaderForCreateAthlete}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
);

const Router = () => {
  const { theme } = useTheme();

  document.getElementById('root')!.classList.add(theme);

  return <RouterProvider router={router} />;
};

export default Router;
