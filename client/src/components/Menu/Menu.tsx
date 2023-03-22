import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { BurgerIcon } from './Burger/Burger';
import * as Style from './Menu.css';
import { $auth } from '@/context/auth';
import { useStore } from 'effector-react';

// children: JSX.Element;
interface INavLinks {
  to: string;
  title: string;
}

export const Menu = () => {
  const isLoggingIn = useStore($auth);
  const navLinks: INavLinks[] = isLoggingIn
    ? [
        { to: '/home', title: 'Главная' },
        { to: '/events', title: 'Соревнования' },
        { to: '/posts', title: 'Рейтинг' },
      ]
    : [
        { to: '/', title: 'Главная' },
        { to: '/posts', title: 'Рейтинг' },
        { to: '/login', title: 'Судейство' },
      ];

  const [isMenuOpen, toggleMenu] = useState<boolean>(false);
  const toggleMenuMode = () => {
    toggleMenu(!isMenuOpen);
  };

  const location = useLocation();
  useEffect(() => {
    toggleMenu(false);
  }, [location]);

  const setActive = ({ isActive }: any) =>
    Style.link(isActive ? { color: 'active' } : {});

  return (
    <div className={Style.container}>
      <div className={Style.navbar}>
        <BurgerIcon isMenuOpen={isMenuOpen} toggleMenuMode={toggleMenuMode} />
      </div>
      <>
        <ul
          className={Style.listLinks({ isOpen: isMenuOpen ? 'open' : 'close' })}
        >
          {navLinks.map((item, index) => {
            return (
              <li key={index}>
                <NavLink to={item.to} className={setActive}>
                  {item.title}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </>
    </div>
  );
};
