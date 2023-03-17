import { EventsList, Slider } from '@/components';
import * as Style from './Main.css';
import { utilClient } from '@/api';
import { defer } from 'react-router-dom';

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

// export async function ranksLoader() {
//   return await utilClient.getRanks();
// }

async function getRanks() {
  // const res = await fetch('https://jsonplaceholder.typicode.com/posts');

  // return res.json();
  return await utilClient.getRanks();
}

const ranksLoader = async () => {
  // console.log({ request, params })

  return defer({
    posts: getRanks(),
  });
};
