import { Menu } from '../../components';
import { MainPage } from '../index';
import * as Style from './Layout.css';
import { useLocation } from 'react-router-dom';

interface ILayoutProps {
  children: JSX.Element;
}

export const Layout: React.FC<ILayoutProps> = (props) => {
  const { children } = props;

  const location = useLocation();

  return (
    <>
      <Menu />
      <div className={Style.container}>
        {location.pathname === '/' ? <MainPage /> : children}
      </div>
      {/* <Footer /> */}
    </>
  );
};
