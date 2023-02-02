// import { Box } from '@mui/material';
import * as Style from './Menu.css';
import image from './img/CloseIcon.svg';

export const Menu = () => {
  // const auth = true;
  // const currentPage = '/';

  return (
    <div>
      <div>
        <svg width="20" height="20">
          <rect fill="#fc0" width="20" height="20" />
        </svg>
        <div className={Style.Burger}></div>
        <img src={image} alt="" height="30px" width="30px" />
        <div>
          <img src={'./img/CloseIcon.svg'} alt="" height="30px" width="30px" />
        </div>
      </div>
      <ul>
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
      </ul>
    </div>
  );
};
