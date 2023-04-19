import { LoaderFunctionArgs } from 'react-router-dom';

// TODO проверить откуда пришел пользователь
export const Judging = () => {
  return <div>dasdasd</div>;
};

export const eventJudgeLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id || '';

  // async function getJudge() {
  //   return await judgeClient.getJudge();
  // }

  // async function getPlaces() {
  //   return await judgeClient.getPlaces();
  // }

  // async function getBusyPlaces(eventId: string) {
  //   return await judgeClient.getBusyPlaces(eventId);
  // }

  // const result = {
  //   event: getJudge(),
  //   places: getPlaces(),
  //   busyPlaces: getBusyPlaces(id.toString()),
  // };

  // return defer(result);
};
