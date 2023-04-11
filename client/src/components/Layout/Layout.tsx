import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useStore } from 'effector-react';
import { $alert } from '@/context/alert';
import { Alert, Footer, Menu, Modal } from '..';
import * as Style from './Layout.css';
import { $modal } from '@/context/modal';

const Layout = () => {
  const alert = useStore($alert);
  const modal = useStore($modal);
  const location = useLocation();

  return (
    <>
      <Menu />

      <div className={Style.wrapper}>
        <main id="block" className={Style.container}>
          <Outlet />
        </main>

        {alert.alertText && <Alert props={alert} />}

        {modal.masRows.length > 0 && <Modal props={modal} />}

        {location.pathname === '/events' ||
        location.pathname === '/users' ||
        location.pathname === '/athletes' ? (
          <NavLink to={`${location.pathname}/new/`}>
            <div id="create" className={Style.button}>
              <span
                className={Style.bar({
                  line: 'top',
                })}
              ></span>
              <span
                className={Style.bar({
                  line: 'bottom',
                })}
              ></span>
            </div>
          </NavLink>
        ) : (
          <></>
        )}
      </div>

      <Footer />
    </>
  );
};

export { Layout };
