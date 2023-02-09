import * as Style from './Menu.css';
import { BurgerIcon } from './Burger/Burger';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export const Menu = () => {
  const [isMenuOpen, toggleMenu] = useState<boolean>(false);
  const toggleMenuMode = () => {
    toggleMenu(!isMenuOpen);
  };

  let location = useLocation();
  useEffect(() => {
    toggleMenu(false);
  }, [location]);

  // const auth = true;

  return (
    <div className={Style.container}>
      <div className={Style.navbar}>
        <BurgerIcon isMenuOpen={isMenuOpen} toggleMenuMode={toggleMenuMode} />
      </div>
      <>
        <ul
          className={Style.listLinks({ isOpen: isMenuOpen ? 'open' : 'close' })}
        >
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                Style.link(isActive ? { color: 'active' } : {})
              }
            >
              Главная
            </NavLink>
          </li>
          <li className={Style.subMenu}>
            <a href="/" className={Style.link({})}>
              О нас
            </a>
            <ul className={Style.subList}>
              <li className={Style.elementList}>
                <a href="/" className={Style.link({})}>
                  Контакты
                </a>
              </li>
              <li className={Style.elementList}>
                <a href="/" className={Style.link({})}>
                  Документы
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="/" className={Style.link({})}>
              Рейтинг
            </a>
          </li>
          <li>
            <NavLink
              to={'/login'}
              className={({ isActive }) =>
                Style.link(isActive ? { color: 'active' } : {})
              }
            >
              Судейство
            </NavLink>
          </li>
        </ul>
      </>
    </div>
  );
};
