import { LoaderFunctionArgs, defer, useLoaderData } from 'react-router-dom';
import * as Style from './Raiting.css';
import { judgeClient } from '@/api';
import { IRanks } from '@/types';

export const RaitingPage = () => {
  interface IReturnTypes {
    id: number;
    ranks: IRanks;
  }
  const { infoEvent } = useLoaderData() as { infoEvent: IReturnTypes[] };
  console.log(infoEvent);

  return <div>dasdasd</div>;
};

export const raitingLoader = async ({ params }: LoaderFunctionArgs) => {
  // async function getRanks() {
  //   // return await judgeClient.getRanks({
  //   //   eventId: id,
  //   // });
  //   return
  // }
  // async function getItems() {
  //   return await judgeClient.getItems();
  // }

  // async function getRaiting() {
  //   return await judgeClient.getPlaces();
  // }

  async function getEvent() {
    return await judgeClient.getEvent();
  }

  const result = {
    infoEvent: getEvent(),
    // ranks: getRanks(),
    // items: getItems(),
    // raiting: getRaiting(),
  };

  return defer(result);
};
