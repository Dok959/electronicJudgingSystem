import { judgeClient } from '@/api';
import { $grant } from '@/context/auth';
import { ISelectEvent } from '@/types/event';
import { useStore } from 'effector-react';
import { Suspense, useCallback, useEffect, useState } from 'react';
import * as Style from './Places.css';
import {
  Await,
  Navigate,
  defer,
  useAsyncValue,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import { IPlaces } from '@/types';
import { useFormik } from 'formik';
import { IPlacesEvent } from '@/types/judging';

export interface IReturnTypes {
  event: ISelectEvent | null;
  places: IPlaces[];
  busyPlaces: IPlacesEvent[];
}

export const Places = () => {
  const { event, places, busyPlaces } = useLoaderData() as IReturnTypes;
  const navigate = useNavigate();

  const isHasRights = useStore($grant);

  return (
    <Suspense fallback={<h3 className={Style.heading}>Загрузка...</h3>}>
      <Await resolve={event}>
        {(resolvedEvent) =>
          resolvedEvent?.id ? (
            <Await resolve={places}>
              <PlacesRender busyPlaces={busyPlaces} />
            </Await>
          ) : (
            <Navigate to={'/events'} />
          )
        }
      </Await>
    </Suspense>
  );
};

// TODO на следующей странице нужно будет проверить откуда пришел пользователь
function PlacesRender({ busyPlaces }: { busyPlaces: IPlacesEvent[] }) {
  const navigate = useNavigate();
  const places = useAsyncValue() as IPlaces[];

  // TODO
  // const [busyPlaces, setBusyPlaces] = useState<IPlacesEvent[]>([]);
  // const loadBusyPlaces = useCallback(async () => {
  //   if (busyPlaces.length === 0) {
  //     setBusyPlaces(await getBusyPlaces(eventId));
  //   }
  // }, [busyPlaces.length, eventId]);
  // // console.log(busyPlaces);

  // useEffect(() => {
  //   loadBusyPlaces();
  // }, [loadBusyPlaces]);

  const formik = useFormik({
    initialValues: {
      place: String,
    },
    onSubmit: async (values) => {
      const { place } = values;
      console.log(place);
      // const param = ranks.map((item) => Number(item));
      // const result = await getEvents(param, 0);
      // setEvents(result);

      // const button = document.getElementById('load') as HTMLElement;
      // if (button !== null) {
      //   button.style.display = 'block';
      // }
    },
  });

  return (
    <Await resolve={busyPlaces}>
      {(resolvedBusyPlaces) => (
        <form onSubmit={formik.handleSubmit} className={Style.container}>
          <h3 className={Style.heading}>Бригада 1</h3>
          {places.map((item: IPlaces, index: number) => (
            <p key={index} className={Style.item}>
              <input
                type="checkbox"
                id={item.id.toString()}
                name="place"
                onChange={(e) => {
                  formik.handleChange(e);
                  formik.submitForm();
                }}
                value={item.id}
                onBlur={formik.handleBlur}
                defaultChecked={Boolean(
                  resolvedBusyPlaces?.find(
                    (el: IPlacesEvent) => el.placeId === item.id,
                  ),
                )}
                className={Style.inputCheckbox}
              />
              <label
                htmlFor={item.id.toString()}
                className={Style.labelCheckbox()}
              >
                {item.title}
              </label>
            </p>
          ))}
        </form>
      )}
    </Await>
  );
}

export const eventJudgeLoader = async ({ params }: any) => {
  const id = params.id;

  async function getJudge() {
    return await judgeClient.getJudge();
  }

  async function getPlaces() {
    return await judgeClient.getPlaces();
  }

  async function getBusyPlaces(eventId: string) {
    return await judgeClient.getBusyPlaces(eventId);
  }

  const result = {
    event: getJudge(),
    places: getPlaces(),
    busyPlaces: getBusyPlaces(id),
  };

  return defer(result);
};
