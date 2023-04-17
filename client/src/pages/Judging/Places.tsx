import { judgeClient } from '@/api';
import { $grant } from '@/context/auth';
import { ISelectEvent } from '@/types/event';
import { useStore } from 'effector-react';
import { Suspense, useEffect } from 'react';
import * as Style from './Places.css';
import {
  Await,
  defer,
  useAsyncValue,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';

export interface IReturnTypes {
  event: ISelectEvent | null;
}

export const Places = () => {
  const { event } = useLoaderData() as IReturnTypes;
  const navigate = useNavigate();

  useEffect(() => {
    if (event?.id === undefined) {
      navigate('/events');
    }
  }, [event, navigate]);

  const isHasRights = useStore($grant);

  return (
    <Suspense fallback={<h3 className={Style.heading}>Загрузка...</h3>}>
      <Await resolve={event}>
        <PlacesRender />
      </Await>
    </Suspense>
  );
};

function PlacesRender() {
  const navigate = useNavigate();
  const event = useAsyncValue() as ISelectEvent | null;
  // useEffect(() => {
  //   if (event === undefined) {
  //     navigate('/events');
  //   }
  // }, [event, navigate]);

  // TODO на следующей странице нужно будет проверить откуда пришел пользователь

  return (
    <article className={Style.container}>
      <p className={Style.item}>
        <input
          type="checkbox"
          id="typeGroup"
          name="typeGroup"
          // onChange={(e) => {
          //   formik.handleChange(e);
          // }}
          // onBlur={formik.handleBlur}
          // checked={formik.values.typeGroup}
          // className={Style.inputCheckbox}
        />
        <label
          htmlFor="typeGroup"
          // className={Style.labelCheckbox({ type: 'right' })}
        >
          Групповая программа
        </label>
      </p>
    </article>
  );
}

async function getJudge() {
  return await judgeClient.getJudge();
}

export const eventJudgeLoader = async () => {
  const result = {
    event: getJudge(),
  };

  return defer(result);
};
