import { Outlet } from 'react-router-dom';
import { Menu } from '../Menu';
import * as Style from './Layout.css';

const Layout = () => {
  return (
    <>
      <Menu />

      <div className={Style.wrapper}>
        <main id="block" className={Style.container}>
          <Outlet />
        </main>
      </div>

      <footer className="container">2021</footer>
    </>
  );
};

export { Layout };
