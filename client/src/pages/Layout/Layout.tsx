import { useStore } from 'effector-react';
import { useLocation } from 'react-router-dom';
import { Alert, Footer, Menu } from '@/components';
import { MainPage } from '../index';
import { $alert } from '@/context/alert';
import * as Style from './Layout.css';

interface ILayoutProps {
  children: JSX.Element;
}

export const Layout: React.FC<ILayoutProps> = (props) => {
  const { children } = props;

  const location = useLocation();

  const alert = useStore($alert);

  return (
    <>
      <Menu />
      <div className={Style.wrapper}>
        <div className={Style.container}>
          {location.pathname === '/' ? <MainPage /> : children}
        </div>
        {alert.alertText && <Alert props={alert} />}
      </div>
      <Footer />
    </>
  );
};
