import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { AuthPage, ErrorPage, EventPage, HomePage, MainPage } from './pages';
import {
  CreateEventPage,
  ranksLoaderForCreateEvent,
} from './pages/Event/create';
import { EditEventPage, eventLoader } from './pages/Event/edit';
import { Notfoundpage } from './pages/TestPages/Notfoundpage';
import { Layout } from './components/Layout/Layout';
import { useTheme } from './hooks';
import { ranksLoader } from './components/EventsList';
import { reLoginLoader } from './pages/Auth';
import {
  RequireAuthOld,
  RequireRightsOld,
  RequireAuth,
  RequireRights,
} from './hoc';
import EffectorList from './pages/TestPages/EffectorList';
// import RequireAuthNew from './hoc/RequireAuthNew';

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
      <Route path="test" element={<EffectorList />} />
      <Route
        path="testNew"
        element={
          <RequireAuth>
            <CreateEventPage />
            {/* <EffectorList /> */}
          </RequireAuth>
        }
        loader={ranksLoaderForCreateEvent}
      />
      <Route path="*" element={<Notfoundpage />} />
    </Route>,
  ),
);
// https://richey.codes/posts/using-effector-for-api-calls-with-react/
// https://habr.com/ru/company/domclick/blog/532016/

const Router = () => {
  const { theme } = useTheme();

  document.getElementById('root')!.classList.add(theme);

  return <RouterProvider router={router} />;
};

export default Router;
