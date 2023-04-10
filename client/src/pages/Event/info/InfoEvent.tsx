import { eventClient, judgeClient } from '@/api';
import { ICustomPropertySelectedEvent } from '@/types/event';
import {
  useLoaderData,
  LoaderFunctionArgs,
  Await,
  useParams,
} from 'react-router-dom';
import * as Style from './InfoEvent.css';
import { Suspense } from 'react';
import { EnumRank } from '@/utils';
import { IRanks } from '@/types';
import { $grant } from '@/context/auth';
import { useStore } from 'effector-react';

export async function loaderInfoEvent({ params }: LoaderFunctionArgs) {
  const eventId = Number(params.id);
  const event = await getEvent(eventId);
  return { event };
}

async function getEvent(id: number) {
  const event = await eventClient.getEvent(id);

  const masPartisipantsIndividualRanks =
    event?.SettingsEvent.filter((el) => el.type.id === 1).map(
      (el) => el.rank,
    ) || [];

  const masPartisipantsGroupRanks =
    event?.SettingsEvent.filter((el) => el.type.id === 2).map(
      (el) => el.rank,
    ) || [];

  return {
    id: event?.id,
    title: event?.title,
    startDateTime: event?.startDateTime.toString().slice(0, -5),
    duration: event?.duration,
    masPartisipantsIndividualRanks: masPartisipantsIndividualRanks,
    typeIndividual: Boolean(masPartisipantsIndividualRanks.length),
    masPartisipantsGroupRanks: masPartisipantsGroupRanks,
    typeGroup: Boolean(masPartisipantsGroupRanks.length),
  };
}

interface IReturnTypes {
  event: ICustomPropertySelectedEvent;
}

async function getJudges(id: number) {
  const judges = await judgeClient.getAllJudge(id);
  console.log(judges);
  return judges;
}

export const InfoEventPage = () => {
  const isHasRights = useStore($grant);
  const { id } = useParams();
  const { event } = useLoaderData() as IReturnTypes;

  const parseDateTime = (dateTime: Date, isDate: boolean) => {
    const date = new Date(dateTime);
    if (isDate) {
      return date.toLocaleString().split(', ')[0];
    } else {
      return date.toLocaleString().split(', ')[1];
    }
  };

  const parseSettings = (type: string, mas: IRanks[]) => {
    let result = `${type}: `;
    mas.map(
      (item) =>
        (result += EnumRank[item.title as keyof typeof EnumRank] + ', '),
    );
    return result.slice(0, -2);
  };

  async function JudgesHandler(e: any) {
    e.preventDefault();
    console.log(id);
    const judges = await getJudges(Number(id));
    console.log('+');
    return;
  }

  return (
    <section className={Style.wrapper}>
      <Suspense fallback={<h3 className={Style.heading}>Загрузка...</h3>}>
        <Await resolve={event}>
          {(resolvedEvent) => (
            <>
              <h4 className={Style.title}>{resolvedEvent.title}</h4>
              <div className={Style.content}>
                <div className={Style.flexContainer({})}>
                  <p className={Style.info}>
                    Дата:{' '}
                    <span>
                      {parseDateTime(resolvedEvent.startDateTime, true)}
                    </span>
                  </p>
                  <p className={Style.info}>
                    Время:{' '}
                    <span>
                      {parseDateTime(resolvedEvent.startDateTime, false)}
                    </span>
                  </p>
                </div>

                <div className={Style.flexContainer({ flex: 'wrap' })}>
                  <p className={Style.info}>
                    {resolvedEvent.typeIndividual
                      ? parseSettings(
                          'Индивидуальное',
                          resolvedEvent.masPartisipantsIndividualRanks,
                        )
                      : null}
                  </p>
                  <p className={Style.info}>
                    {resolvedEvent.typeGroup
                      ? parseSettings(
                          'Групповое',
                          resolvedEvent.masPartisipantsGroupRanks,
                        )
                      : null}
                  </p>
                </div>

                <div className={Style.judges}>
                  <div className={Style.judgesHeader}>
                    <h5 className={Style.subTitle}>Судьи</h5>
                    {isHasRights ? (
                      <button className={Style.detail} onClick={JudgesHandler}>
                        Добавить
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className={Style.judgesList}>
                    <ul>
                      <li>имя</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </Await>
      </Suspense>
    </section>
  );
};
