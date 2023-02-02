import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { useTheme } from './hooks';

const Main = () => {
  const { theme, switchTheme } = useTheme();

  return (
    <div className={theme}>
      <App />
      <button onClick={() => switchTheme()}>
        Switch to {theme ? 'light' : 'dark'} theme
      </button>
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
);
