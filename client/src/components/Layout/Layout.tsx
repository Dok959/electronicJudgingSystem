import { Outlet } from 'react-router-dom';
import { Menu } from '../Menu';
import * as Style from './Layout.css';
import { useStore } from 'effector-react';
import { $alert } from '@/context/alert';
import { Alert } from '..';

const Layout = () => {
  const alert = useStore($alert);

  return (
    <>
      <Menu />

      <div className={Style.wrapper}>
        <main id="block" className={Style.container}>
          <Outlet />
        </main>

        {alert.alertText && <Alert props={alert} />}
      </div>

      <footer className="container">2021</footer>
    </>
  );
};

export { Layout };
