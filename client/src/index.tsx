import ReactDOM from 'react-dom/client';
import Router from './router';
import React from 'react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
);
