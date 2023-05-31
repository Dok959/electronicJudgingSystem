import * as Style from './Contact.css';

export const ContactPage = () => {
  return (
    <>
      <h3 className={Style.mainTitle}>Контакты</h3>
      <div className={Style.wrapper}>
        <img src="/images/3.jpg" alt="" className={Style.image} />
        <div className={Style.contentWrapper}>
          <div className={Style.container}>
            <p className={Style.subTitle}>Адрес</p>
            <p className={Style.content}>
              г. Астрахань, ул. Советская/Щелгунова, 21/16
            </p>
          </div>

          <div className={Style.container}>
            <p className={Style.subTitle}>Телефон</p>
            <p className={Style.content}>+7(8512)51-90-09</p>
          </div>

          <div className={Style.container}>
            <p className={Style.subTitle}>Время работы</p>
            <p className={Style.content}>пн-пт с 9:00 до 20:00</p>
          </div>
        </div>
      </div>
    </>
  );
};
