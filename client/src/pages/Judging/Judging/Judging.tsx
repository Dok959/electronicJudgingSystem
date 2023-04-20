import { Suspense, useCallback, useEffect, useState } from 'react';
import {
  Await,
  LoaderFunctionArgs,
  Navigate,
  defer,
  useAsyncValue,
  useLoaderData,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { judgeClient, partisipantClient } from '@/api';
import { IPlacesEvent } from '@/types/judging';
import * as Style from './Judging.css';
import { useStore } from 'effector-react';
import { $grant } from '@/context/auth';
import { useFormik } from 'formik';
import { IPartisipants, ISelectAthlete } from '@/types/athlete';
import { IItem, IRanks } from '@/types';
import { EnumRank } from '@/utils';

interface IReturnTypes {
  id: string;
  place: IPlacesEvent;
  partisipants: IPartisipants[];
  ranks: IRanks[];
  items: IItem[];
}

export const Judging = () => {
  const { id, place, partisipants, ranks, items } =
    useLoaderData() as IReturnTypes;
  const location = useLocation();
  const navigate = useNavigate();
  if (location.pathname !== `/events/${id}/judging`) {
    navigate('/events');
  }

  const isHasRights = useStore($grant);

  return (
    <Suspense fallback={<h3 className={Style.heading}>Загрузка...</h3>}>
      <Await resolve={place}>
        {(resolvedPlace: IPlacesEvent) =>
          resolvedPlace?.id ? (
            resolvedPlace?.placeId === 14 && isHasRights === true ? (
              <div>Главный судья</div>
            ) : resolvedPlace?.placeId === 13 ? (
              <Await resolve={{ partisipants, ranks, items }}>
                <Secretary />
              </Await>
            ) : (
              <BaseJudge />
            )
          ) : (
            <Navigate to={'/events'} />
          )
        }
      </Await>
    </Suspense>
  );
};

const BaseJudge = () => {
  const [partisipant, setPartisipant] = useState<ISelectAthlete>();
  const [cursorInit, setCursorInit] = useState<number>(0);

  const loadInitData = useCallback(async () => {
    // function changeCursor() {
    //   setCursorInit(events[events.length - 1]?.id);
    // }
    // if (cursorInit === 0) {
    //   // setPartisipant(await getEvents([], cursorInit));
    // }
    // changeCursor();
  }, []);

  useEffect(() => {
    loadInitData();
  }, [loadInitData]);

  const formik = useFormik({
    initialValues: {
      place: [] as String[],
    },
    onSubmit: async (values) => {
      const { place } = values;
      // const data = {
      //   eventId: eventId,
      //   placeId: Number(place.find((item) => item)),
      // };
      // const result = await setJudgePlace(data);
      // if (result) {
      //   navigate(`/events/${eventId}/judging`);
      // }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={Style.container}>
      <h3 className={Style.heading}>Иванов Иван</h3>
      {/* {places.map((item: IPlaces, index: number) => (
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
          <label htmlFor={item.id.toString()} className={Style.labelCheckbox()}>
            {item.title}
          </label>
        </p>
      ))} */}
    </form>
  );
};

const Secretary = () => {
  const props = useAsyncValue() as {
    partisipants: IPartisipants[];
    ranks: IRanks[];
    items: IItem[];
  };
  const { partisipants, ranks, items } = props;
  // console.log(partisipants);
  // console.log(items);
  // console.log(ranks);

  interface IInitValues {
    rank: number;
    item: number;
  }

  const formik = useFormik({
    initialValues: {
      select: [] as IInitValues[],
    },
    onSubmit: async (values) => {
      console.log(values);
      // const { place } = values;
      // const data = {
      //   eventId: eventId,
      //   placeId: Number(place.find((item) => item)),
      // };
      const result = await judgeClient.getQueue(values.select);
      console.log(result);
      // if (result) {
      //   navigate(`/events/${eventId}/judging`);
      // }
    },
  });

  return (
    <Suspense fallback={<h3 className={Style.heading}>Загрузка...</h3>}>
      <form onSubmit={formik.handleSubmit} className={Style.container}>
        <Await resolve={ranks}>
          {(resolvedRanks: IRanks[]) => (
            <>
              {resolvedRanks.map((rank: IRanks, index: number) => (
                <article className={Style.container} key={index}>
                  <h3 className={Style.heading}>
                    {EnumRank[rank.title as keyof typeof EnumRank]}
                  </h3>
                  <div className={Style.wrapperItems}>
                    <Await resolve={items}>
                      {(resolvedItems: IItem[]) => (
                        <>
                          {resolvedItems.map((item: IItem) => (
                            <p key={item.id} className={Style.ranks}>
                              <input
                                type="checkbox"
                                id={`${index} ${item.id}`}
                                name="select"
                                value={item.id}
                                onChange={() => {
                                  const selectedItem =
                                    formik.values.select.findIndex(
                                      (elem) =>
                                        elem.rank === rank.id &&
                                        elem.item === item.id,
                                    );
                                  if (selectedItem === -1) {
                                    formik.values.select.push({
                                      rank: rank.id,
                                      item: item.id,
                                    });
                                  } else {
                                    formik.values.select.splice(
                                      selectedItem,
                                      1,
                                    );
                                  }
                                }}
                                onBlur={formik.handleBlur}
                                className={Style.inputCheckbox}
                              />
                              <label
                                htmlFor={`${index} ${item.id}`}
                                className={Style.labelCheckbox()}
                              >
                                {item.title}
                              </label>
                            </p>
                          ))}
                        </>
                      )}
                    </Await>
                  </div>
                </article>
              ))}
            </>
          )}
        </Await>

        <button type="submit" className={Style.button({})} id="button">
          Сохранить
          {/* {spinner ? <Spinner top={0} left={0} /> : 'Сохранить'} */}
        </button>
      </form>
    </Suspense>
  );
};

export const judgePlaceLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id || '';

  async function getJudgePlace() {
    return await judgeClient.getJudgePlace(id);
  }

  async function getPartisipants() {
    return await partisipantClient.getPartisipants({
      eventId: id,
    });
  }
  async function getRanks() {
    return await judgeClient.getRanks({
      eventId: id,
    });
  }
  async function getItems() {
    return await judgeClient.getItems();
  }

  const result = {
    id,
    place: getJudgePlace(),
    partisipants: getPartisipants(),
    ranks: getRanks(),
    items: getItems(),
  };

  return defer(result);
};
