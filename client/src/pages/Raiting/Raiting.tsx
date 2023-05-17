import {
  Await,
  LoaderFunctionArgs,
  defer,
  useLoaderData,
} from 'react-router-dom';
import * as Style from './Raiting.css';
import { judgeClient } from '@/api';
import { IRanks } from '@/types';
import { Suspense, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { EnumRank } from '@/utils';

export const RaitingPage = () => {
  interface IReturnTypes {
    id: number;
    rank: IRanks;
  }
  const { infoEvent } = useLoaderData() as { infoEvent: IReturnTypes[] };

  const [isFirstQuery, setIsFirstQuery] = useState<boolean>(true);

  // const [cursor, setCursor] = useState<number>(0);

  // useEffect(() => {
  //   console.log(infoEvent);
  //   // setCursor(infoEvent[0].id);
  // }, [infoEvent]);

  async function getRaiting(settingsEvent: number) {
    return await judgeClient.getRaiting(settingsEvent);
  }

  const formik = useFormik({
    initialValues: {
      settingsEvent: 0, // TODO!
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

  const mas: { id: number; rank: string }[] = [];

  return (
    <Suspense fallback={<h3 className={Style.heading}>Загрузка...</h3>}>
      <Await resolve={infoEvent}>
        <>
          {
            (resolvedInfoEvent: IReturnTypes[]) => {
              resolvedInfoEvent.map((item: IReturnTypes, index: number) => {
                mas.push({ id: item.id, rank: item.rank.title });
              });
              return <Page mas={mas} />;
            }

            // <form onSubmit={formik.handleSubmit} className={Style.container}>
            //   {resolvedInfoEvent.map((item: IReturnTypes, index: number) => {
            //     return (
            //       <p className={Style.item} key={item.id}>
            //         <input
            //           type="radio"
            //           id={`rankId${item.id}`}
            //           name="settingsEvent"
            //           onClick={(e) => {
            //             formik.values.settingsEvent = item.id;
            //             formik.submitForm();
            //           }}
            //           onBlur={formik.handleBlur}
            //           value={item.id}
            //           defaultChecked={index === 0}
            //         />
            //         <label htmlFor={`rankId${item.id}`}>
            //           {EnumRank[item.rank.title as keyof typeof EnumRank]}
            //         </label>
            //         {/* <>
            //           {() => {
            //             if (isFirstQuery) {
            //               getRaiting(item.id);
            //               setIsFirstQuery(false);
            //             }
            //             return <></>;
            //           }}
            //         </> */}
            //         {/* {isFirstQuery ? (
            //           <>
            //             <>{getRaiting(item.id)}</>
            //             <>{setIsFirstQuery(false)}</>
            //           </>
            //         ) : (
            //           <></>
            //         )} */}
            //       </p>
            //     );
            //   })}
            // </form>
          }
        </>
      </Await>
    </Suspense>
  );
};

// TODO переписать на обычные запросы
export const raitingLoader = async () => {
  async function getEvent() {
    return await judgeClient.getEvent();
  }

  const result = {
    infoEvent: getEvent(),
  };

  return defer(result);
};

export const Page = (props: any) => {
  const { mas } = props;
  const [isFirstQuery, setIsFirstQuery] = useState<boolean>(true);

  async function getRaiting(settingsEvent: number) {
    return await judgeClient.getRaiting(settingsEvent);
  }

  const formik = useFormik({
    initialValues: {
      settingsEvent: 0, // TODO!
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
    <form onSubmit={formik.handleSubmit} className={Style.container}>
      {mas.map((item: any, index: number) => {
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
            />
            <label htmlFor={`rankId${item.id}`}>
              {EnumRank[item.rank.title as keyof typeof EnumRank]}
            </label>
            {/* <>
              {() => {
                if (isFirstQuery) {
                  getRaiting(item.id);
                  setIsFirstQuery(false);
                }
                return <></>;
              }}
            </> */}
          </p>
        );
      })}
    </form>
  );
};
