import { Menu } from '../../components';

interface ILayoutProps {
  children: JSX.Element;
}

export const Layout: React.FC<ILayoutProps> = (props) => {
  const { children } = props;

  return (
    <div>
      <Menu />
      <div>{children}</div>
      {/* <Footer /> */}
    </div>
  );
};
