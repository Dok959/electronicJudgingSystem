import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import Router from './router';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    {/* <BrowserRouter> */}
    <Router />
    {/* </BrowserRouter> */}
  </StrictMode>,
);
