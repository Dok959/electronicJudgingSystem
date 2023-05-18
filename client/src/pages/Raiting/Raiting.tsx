import { Await } from 'react-router-dom';
import * as Style from './Raiting.css';
import { judgeClient } from '@/api';
import { IRanks } from '@/types';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { EnumRank } from '@/utils';
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
    return (await judgeClient.getRaiting(settingsEvent)) as IRaitingTypes[];
  }

  const formik = useFormik({
    initialValues: {
      settingsEvent: 0,
    },
    onSubmit: async (values) => {
      const { settingsEvent } = values;
      const result = await getRaiting(settingsEvent);
      return setRaiting(result);
    },
  });

  return (
    <Suspense fallback={<h3 className={Style.heading}>Загрузка...</h3>}>
      <Await resolve={infoEvent}>
        <>
          <form onSubmit={formik.handleSubmit} className={Style.container}>
            {infoEvent.map((item: any, index: number) => {
              return (
                <p className={Style.item} key={index}>
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
          <div className={Style.tableWrapper}>
            <table className={Style.table}>
              <thead>
                <tr>
                  <th className={Style.tableHeader}>Место</th>
                  <th className={Style.tableHeader}>ФИО</th>
                  <th className={Style.tableHeader}>Предмет 1</th>
                  <th className={Style.tableHeader}>Предмет 2</th>
                  <th className={Style.tableHeader}>Предмет 3</th>
                  <th className={Style.tableHeader}>Предмет 4</th>
                  <th className={Style.tableHeader}>Итого</th>
                </tr>
              </thead>
              <tbody>
                {/* TODO стили таблиц */}
                {raiting.map((item, index: number) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{`${item.partisipant.sirname} ${
                        item.partisipant.name
                      } ${
                        item.partisipant.patronymic
                          ? item.partisipant.patronymic
                          : ''
                      }`}</td>
                      {item.scores.map((score: number, JIndex: number) => {
                        if (score === null) {
                          return <td key={JIndex}></td>;
                        } else {
                          return <td key={JIndex}>{score.toFixed(3)}</td>;
                        }
                      })}
                      <td>{item.sum.toFixed(3)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      </Await>
    </Suspense>
  );
};
