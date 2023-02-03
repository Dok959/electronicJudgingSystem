import { vars } from '@/theme/index';
import * as Style from './Burger.css';

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

export const BurgerIcon = (props: Props) => {
  // const hamb = document.querySelector('#hamb')!;

  // // Выполняем действия при клике ..
  // const hambHandler = (event: { preventDefault: () => void }): void => {
  //   event.preventDefault();
  //   // Переключаем стили элементов при клике
  //   // popup.classList.toggle('open');
  //   hamb.classList.toggle('active');
  //   // body.classList.toggle('noscroll');
  //   // renderPopup();
  // };

  // hamb.addEventListener('click', hambHandler);

  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={Style.position}
      id="hamb"
    >
      <path
        d="M18 18L9.5 9.5L1 1M1 18L18 1"
        stroke={vars.colors.text.normal}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
