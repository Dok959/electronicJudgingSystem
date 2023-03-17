import { Outlet } from 'react-router-dom';

import { useTheme } from './hooks';
// import { Layout } from './pages';

const App = () => {
  const { theme } = useTheme();

  document.getElementById('root')!.classList.add(theme);

  return (
    // <Layout>
    <Outlet />
    // </Layout>
  );
};

export default App;
