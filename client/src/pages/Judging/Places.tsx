import { Suspense } from 'react';
import { useFormik } from 'formik';
import {
  Await,
  LoaderFunctionArgs,
  Navigate,
  defer,
  useAsyncValue,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import { judgeClient } from '@/api';
import { IPlaces } from '@/types';
import { ISelectEvent } from '@/types/event';
import { IPlacesEvent } from '@/types/judging';
import * as Style from './Places.css';

export interface IReturnTypes {
  event: ISelectEvent | null;
  places: IPlaces[];
  busyPlaces: IPlacesEvent[];
}

export const Places = () => {
  const { event, places, busyPlaces } = useLoaderData() as IReturnTypes;
  const navigate = useNavigate();

  if (event === null) {
    navigate('/events');
  }

  return (
    <Suspense fallback={<h3 className={Style.heading}>Загрузка...</h3>}>
      <Await resolve={event}>
        {(resolvedEvent) =>
          resolvedEvent?.id ? (
            <Await resolve={places}>
              <PlacesRender
                busyPlaces={busyPlaces}
                eventId={resolvedEvent!.id}
              />
            </Await>
          ) : (
            <Navigate to={'/events'} />
          )
        }
      </Await>
    </Suspense>
  );
};

function PlacesRender({
  busyPlaces,
  eventId,
}: {
  busyPlaces: IPlacesEvent[];
  eventId: number;
}) {
  const navigate = useNavigate();
  const places = useAsyncValue() as IPlaces[];

  async function setJudgePlace(data: {}) {
    return await judgeClient.setJudgePlace(data);
  }

  const formik = useFormik({
    initialValues: {
      place: [] as String[],
    },
    onSubmit: async (values) => {
      const { place } = values;
      const data = {
        eventId: eventId,
        placeId: Number(place.find((item) => item)),
      };
      const result = await setJudgePlace(data);
      if (result) {
        navigate(`/events/${eventId}/judging`);
      }
    },
  });

  return (
    <Await resolve={busyPlaces}>
      {(resolvedBusyPlaces) => (
        <form onSubmit={formik.handleSubmit} className={Style.container}>
          <h3 className={Style.heading}>Бригада 1</h3>
          <article className={Style.wrapperItems}>
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
                  disabled={Boolean(
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
          </article>
        </form>
      )}
    </Await>
  );
}

export const eventJudgeLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id || '';

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
    busyPlaces: getBusyPlaces(id.toString()),
  };

  return defer(result);
};
