import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
  Routes,
} from 'react-router-dom';
import { useStore } from 'effector-react';

import App from './App';
import { AuthPage, ErrorPage, EventPage } from './pages';
import { $auth, $grant } from './context/auth';
import { ranksLoader, reLoginLoader } from './loaders';
import { CreateEventPage } from './pages/Event/create';
import { dataLoader as eventLoader, EditEventPage } from './pages/Event/edit';
import { RequireAuth } from './hoc/RequireAuth';
import { Aboutpage } from './pages/TestPages/Aboutpage';
import { Blogpage } from './pages/TestPages/Blogpage';
import { Createpost } from './pages/TestPages/Createpost';
import { Editpost } from './pages/TestPages/Editpost';
import { Mainpage } from './pages/TestPages/Mainpage';
import { Notfoundpage } from './pages/TestPages/Notfoundpage';
import { Singlepage } from './pages/TestPages/Singlepage';
import { Layout } from './components/Layout/Layout';
import { useTheme } from './hooks';

const Router = () => {
  const { theme } = useTheme();

  document.getElementById('root')!.classList.add(theme);

  // reLoginLoader();
  // const isLoggingIn = useStore($auth);
  // const isHasRights = useStore($grant);

  // console.log(isLoggingIn, isHasRights);

  // const router1 = createBrowserRouter(
  //   createRoutesFromElements(
  //     // <Router>
  //     //   <Switch>
  //     //     <Route path="/account" component={Account} />
  //     //     <Route path="/contacts" component={Contacts} />
  //     //     <Route path="/inbox" component={Inbox} />
  //     //     <Route exact path="/" component={Home} />
  //     //     <Route component={Error404} />
  //     //   </Switch>
  //     // </Router>,
  //     <Route
  //       // exact
  //       path="/"
  //       element={<App />}
  //       errorElement={<ErrorPage />}
  //       loader={ranksLoader}
  //     >
  //       <Route
  //         path="event/:eventId(\d*)"
  //         element={isHasRights ? <EditEventPage /> : <div>печаль</div>}
  //         loader={eventLoader}
  //       />
  //       <Route
  //         path="event/create"
  //         element={isHasRights ? <CreateEventPage /> : <div>gsdf</div>}
  //         loader={ranksLoader}
  //       />
  //       <Route
  //         path="/event"
  //         element={isLoggingIn ? <EventPage /> : <Navigate to={'/'} />}
  //         loader={ranksLoader}
  //       />
  //     </Route>,
  //   ),
  // );

  // const router = createBrowserRouter(
  //   [
  //     {
  //       path: '/',
  //       element: <App />,
  //       errorElement: <ErrorPage />,
  //       loader: ranksLoader,
  //       children: [
  //         {
  //           path: 'login',
  //           element: isLoggingIn ? <Navigate to={'/event'} /> : <AuthPage />,
  //         },
  //         {
  //           path: 'event/:eventId',
  //           element: isHasRights ? <EditEventPage /> : <div>печаль</div>,
  //           loader: eventLoader,
  //         },
  //         {
  //           path: 'event/create',
  //           element: isHasRights ? <CreateEventPage /> : <div>gsdf</div>,
  //           loader: ranksLoader,
  //         },
  //         // {
  //         //   path: 'event',
  //         //   element: isLoggingIn ? <EventPage /> : <Navigate to={'/'} />,
  //         //   loader: ranksLoader,
  //         // },
  //         // {
  //         //   path: 'event/:contactId/edit',
  //         //   element: <EditContact />,
  //         // },
  //         {
  //           path: 'event',
  //           element: isLoggingIn ? <EventPage /> : <Navigate to={'/'} />,
  //           loader: ranksLoader,
  //         },
  //       ],
  //     },
  //   ],
  //   { basename: '/' },
  // );

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Mainpage />} />
          <Route path="about" element={<Aboutpage />} />
          <Route path="posts" element={<Blogpage />} />
          <Route path="posts/:id" element={<Singlepage />} />
          <Route path="posts/:id/edit" element={<Editpost />} />
          <Route
            path="posts/new"
            element={
              <RequireAuth>
                <Createpost />
              </RequireAuth>
            }
          />
          <Route
            path="posts/new/edit"
            element={<Navigate replace to="/posts/new" />}
          />
          <Route path="*" element={<Notfoundpage />} />
        </Route>
      </Routes>
    </>
  );
};

/* https://www.youtube.com/watch?v=wZ1P3QM9_p8&list=PLiZoB8JBsdznY1XwBcBhHL9L7S_shPGVE&index=4 */

export default Router;
