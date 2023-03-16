import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { BurgerIcon } from './Burger/Burger';
import * as Style from './Menu.css';

export const Menu = () => {
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
          {location.pathname === ('/' || '/login') ? (
            <>
              <li>
                <NavLink to="/" className={setActive}>
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
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    Style.link(isActive ? { color: 'active' } : {})
                  }
                >
                  Главная
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/event"
                  className={({ isActive }) =>
                    Style.link(isActive ? { color: 'active' } : {})
                  }
                >
                  Соревнования
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/'}
                  className={({ isActive }) =>
                    Style.link(isActive ? { color: 'active' } : {})
                  }
                >
                  На сайт
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </>
    </div>
  );
};
