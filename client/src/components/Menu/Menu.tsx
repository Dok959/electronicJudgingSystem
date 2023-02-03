import * as Style from './Menu.css';
import { BurgerIcon } from './Burger/Burger';
import { useState } from 'react';

export const Menu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const close = () => setOpen(false); //false

  // const auth = true;
  // const currentPage = '/';

  const hamb = document.querySelector('#hamb')!;

  // Выполняем действия при клике ..
  const hambHandler = (event: { preventDefault: () => void }): void => {
    event.preventDefault();
    // Переключаем стили элементов при клике
    // popup.classList.toggle('open');
    hamb.classList.toggle('active');
    // body.classList.toggle('noscroll');
    // renderPopup();
  };

  // hamb.addEventListener('click', hambHandler);

  return (
    <div className={Style.container}>
      {/* <div className={Style.navbar}> */}
      <BurgerIcon open={open} setOpen={setOpen} />
      {/* <ul className={Style.listLinks({})}>
          <li>
            <a href="/" className={Style.link({ color: 'secondary' })}>
              Главная
            </a>
          </li>
          <li>
            <a href="/" className={Style.link({})}>
              О нас
            </a>
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
          </li>{' '}
        </ul> */}
      {/* </div> */}
    </div>
  );
};
