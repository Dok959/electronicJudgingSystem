import { Link, Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { useTheme } from './hooks';
import { Aboutpage } from './pages/TestPages/Aboutpage';
import { Blogpage } from './pages/TestPages/Blogpage';
import { Notfoundpage } from './pages/TestPages/Notfoundpage';
import { Mainpage } from './pages/TestPages/Mainpage';
import { Layout } from './components/Layout';
import { Createpost } from './pages/TestPages/Createpost';
import { Editpost } from './pages/TestPages/Editpost';
import { Singlepage } from './pages/TestPages/Singlepage';

const Test = () => {
  const { theme } = useTheme();

  document.getElementById('root')!.classList.add(theme);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Mainpage />} />
          <Route path="about" element={<Aboutpage />} />
          <Route path="posts" element={<Blogpage />} />
          <Route path="posts/:id" element={<Singlepage />} />
          <Route path="posts/:id/edit" element={<Editpost />} />
          <Route path="posts/new" element={<Createpost />} />
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

export default Test;
