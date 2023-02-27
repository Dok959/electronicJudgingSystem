import { EventsList, Slider } from '@/components';
import * as Style from './Main.css';

export const MainPage = () => {
  return (
    <>
      <h1 className={Style.mainTitle}>
        Астраханская федерация художественной гимнастики
      </h1>
      <Slider />
      <EventsList />
    </>
  );
};
