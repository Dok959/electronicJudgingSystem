import { Link, useMatch } from 'react-router-dom';

interface ICustomLink {
  children: string; //JSX.Element;
  to: string;
  props?: any;
}

const CustomLink = ({ children, to, ...props }: ICustomLink) => {
  const match = useMatch({
    path: to,
    // end: to.length === 1,
  });

  return (
    <Link
      to={to}
      style={{
        color: match ? 'var(--color-active)' : 'white',
      }}
      {...props}
    >
      {children}
    </Link>
  );
};

export { CustomLink };
