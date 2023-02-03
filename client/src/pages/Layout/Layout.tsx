import { Menu } from '../../components';
import * as Style from './Layout.css';

interface ILayoutProps {
  children: JSX.Element;
}

export const Layout: React.FC<ILayoutProps> = (props) => {
  const { children } = props;

  return (
    <>
      <Menu />
      <div className={Style.container}>{children}</div>
      {/* <Footer /> */}
    </>
  );
};
