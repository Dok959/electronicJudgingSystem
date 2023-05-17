import {
  Await,
  LoaderFunctionArgs,
  defer,
  useLoaderData,
} from 'react-router-dom';
import * as Style from './Raiting.css';
import { judgeClient } from '@/api';
import { IItem, IRanks } from '@/types';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { EnumRank } from '@/utils';
import React from 'react';
import { ISelectAthlete } from '@/types/athlete';

export const RaitingPage = () => {
  interface IReturnTypes {
    id: number;
    rank: IRanks;
  }

  const [infoEvent, setInfoEvent] = useState<IReturnTypes[]>([]);

  const loadRanksData = useCallback(async () => {
    async function getEvent() {
      return await judgeClient.getEvent();
    }

    if (infoEvent.length === 0) {
      setInfoEvent((await getEvent()) as IReturnTypes[]);
    }
  }, [infoEvent, setInfoEvent]);

  useEffect(() => {
    loadRanksData();
  }, [loadRanksData]);

  useEffect(() => {
    console.log(infoEvent);
  }, [infoEvent]);

  interface IRaitingTypes {
    partisipant: ISelectAthlete;
    scores: number[];
    sum: number;
  }

  const [raiting, setRaiting] = useState<IRaitingTypes[]>([]);

  const loadRaitingData = useCallback(async () => {
    if (infoEvent.length !== 0) {
      setRaiting((await getRaiting(infoEvent[0].id)) as IRaitingTypes[]);
    }
  }, [infoEvent, setRaiting]);

  useEffect(() => {
    loadRaitingData();
  }, [infoEvent, loadRaitingData]);

  useEffect(() => {
    console.log(raiting);
  }, [raiting]);

  async function getRaiting(settingsEvent: number) {
    return await judgeClient.getRaiting(settingsEvent);
  }

  const formik = useFormik({
    initialValues: {
      settingsEvent: 0,
    },
    onSubmit: async (values) => {
      console.log('-----');
      const { settingsEvent } = values;
      console.log(settingsEvent);

      const result = getRaiting(settingsEvent);
      console.log(result);

      return;
    },
  });

  return (
    <Suspense fallback={<h3 className={Style.heading}>Загрузка...</h3>}>
      <Await resolve={infoEvent}>
        <>
          <form onSubmit={formik.handleSubmit} className={Style.container}>
            {infoEvent.map((item: any, index: number) => {
              return (
                <p className={Style.item} key={item.id}>
                  <input
                    type="radio"
                    id={`rankId${item.id}`}
                    name="settingsEvent"
                    onClick={(e) => {
                      formik.values.settingsEvent = item.id;
                      formik.submitForm();
                    }}
                    onBlur={formik.handleBlur}
                    value={item.id}
                    defaultChecked={index === 0}
                    className={Style.inputRadio}
                  />
                  <label
                    htmlFor={`rankId${item.id}`}
                    className={Style.labelRadio}
                  >
                    {EnumRank[item.rank.title as keyof typeof EnumRank]}
                  </label>
                </p>
              );
            })}
          </form>
          <table>
            <thead>
              <tr>
                <th>Место</th>
                <th>ФИО</th>
                <th>Предмет 1</th>
                <th>Предмет 2</th>
                <th>Предмет 3</th>
                <th>Предмет 4</th>
                <th>Итого</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {raiting.map((item, index: number) => {
                  return (
                    <React.Fragment key={index}>
                      <td>{index + 1}</td>
                      <td>{`${item.partisipant.sirname} ${
                        item.partisipant.name
                      } ${
                        item.partisipant.patronymic
                          ? item.partisipant.patronymic
                          : ''
                      }`}</td>
                      {item.scores.map((score: number) => {
                        if (score === null) {
                          return <td></td>;
                        } else {
                          return <td>{score}</td>;
                        }
                      })}
                      <td>{item.sum}</td>
                    </React.Fragment>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </>
      </Await>
    </Suspense>
  );
};
