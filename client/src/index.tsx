import React from 'react';
import ReactDOM from 'react-dom/client';

import Router from './router';
import { BrowserRouter } from 'react-router-dom';
import Test from './test';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <Router /> */}
    <BrowserRouter>
      <Test />
    </BrowserRouter>
  </React.StrictMode>,
);
