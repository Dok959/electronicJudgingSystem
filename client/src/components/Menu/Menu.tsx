import * as Style from './Menu.css';
import { BurgerIcon } from './Burger/Burger';
import { useState } from 'react';

export const Menu = () => {
  const [isMenuOpen, toggleMenu] = useState<boolean>(false);

  const toggleMenuMode = () => {
    toggleMenu(!isMenuOpen);
  };

  // const auth = true;
  // const currentPage = '/';

  return (
    <div className={Style.container}>
      <div className={Style.navbar}>
        <BurgerIcon isMenuOpen={isMenuOpen} toggleMenuMode={toggleMenuMode} />
      </div>
      <>
        {console.log(isMenuOpen)}
        <ul
          className={Style.listLinks({ isOpen: isMenuOpen ? 'open' : 'close' })}
        >
          <li>
            <a href="/" className={Style.link({ color: 'secondary' })}>
              Главная
            </a>
          </li>
          <li>
            <a href="/" className={Style.link({})}>
              О нас
            </a>
            <ul className={Style.subList}>
              <li>
                <a href="/" className={Style.link({})}>
                  Контакты
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
            <a href="/" className={Style.link({})}>
              Судейство
            </a>
          </li>
        </ul>
      </>
    </div>
  );
};
