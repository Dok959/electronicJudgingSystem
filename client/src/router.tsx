import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import App from './App';
import { AuthPage, ErrorPage } from './pages';
import { useStore } from 'effector-react';
import { $auth } from './context/auth';
import { action as loginAction } from './pages/Auth/Auth';

const Router = () => {
  const isLoggingIn = useStore($auth);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />} errorElement={<ErrorPage />}>
        <Route
          path="login"
          element={isLoggingIn ? <Navigate to={'/primary'} /> : <AuthPage />}
          action={loginAction}
          // action={async ({ request, params }) => {
          //   switch (request.method) {
          //     case 'POST': {
          //       let formData = await request.formData();
          //       let email = formData.get('email');
          //       console.log(email);
          //       // return fakeUpdateProject(name);
          //       return;
          //     }
          //     default: {
          //       throw new Response('', { status: 405 });
          //     }
          //   }
          // }}
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
