import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import App from './App';
import { AuthPage } from './pages';

export let router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="login" element={<AuthPage />} />
      <Route path="five" element={<h2>Five</h2>} />
    </Route>,
  ),
);
