import { Slider } from '@/components';
import * as Style from './Main.css';

export const MainPage = () => {
  return (
    <>
      <h1 className={Style.title}>
        Астраханская федерация художественной гимнастики
      </h1>
      <Slider></Slider>
      <div>Страница</div>
    </>
  );
};
