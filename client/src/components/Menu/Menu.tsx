import * as Style from './Menu.css';
import image from './img/CloseIcon.svg';
import image4 from './img/first.jpg';
const image1 = require('./img/first.jpg') as string;
const image2: string = require('./img/CloseIcon.svg').default;
const image3: string = require('./img/first.jpg').default; // не работает

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
        <img src="/images/CloseIcon.svg" alt="" height="30px" width="30px" />
        <img src="/images/first.jpg" alt="" height="30px" width="30px" />
        <img src={image} alt="" height="30px" width="30px" />
        <img src={image1} alt="" height="30px" width="30px" />
        <div>
          <img src={image2} alt="" height="30px" width="30px" />
        </div>
        <img src={image3} alt="" height="30px" width="30px" />
        <img src={image4} alt="" height="30px" width="30px" />
      </div>
      {/* https://codelab.pro/prostoe-burger-menyu-na-chistom-javascript/ */}
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
