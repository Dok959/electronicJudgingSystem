import * as Style from './Burger.css';

type Props = {
  isMenuOpen: boolean;
  toggleMenuMode: () => void;
};

export const BurgerIcon = (props: Props) => {
  const clickHandler = () => {
    props.toggleMenuMode();
  };

  return (
    <div
      className={Style.position}
      aria-label="Открыть главное меню"
      onClick={clickHandler}
    >
      <span
        className={Style.bar({
          isOpen: props.isMenuOpen ? 'openTop' : 'closeTop',
        })}
      ></span>
      <span
        className={Style.bar({
          isOpen: props.isMenuOpen ? 'openBottom' : 'closeBottom',
        })}
      ></span>
    </div>
  );
};
