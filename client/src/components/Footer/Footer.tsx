import * as Style from './Footer.css';

export const Footer = () => {
  return (
    <div className={Style.container}>
      &#169;, 2022 - {new Date().getFullYear()}
    </div>
  );
};
