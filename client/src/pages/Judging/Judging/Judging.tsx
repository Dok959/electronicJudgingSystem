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
import { IEntryPartisipant, IPlacesEvent } from '@/types/judging';
import * as Style from './Judging.css';
import { useStore } from 'effector-react';
import { $grant } from '@/context/auth';
import { useFormik } from 'formik';
import { IPartisipants, ISelectAthlete } from '@/types/athlete';
import { IItem, IRanks } from '@/types';
import { handleAlertMessage } from '@/utils/auth';
import { EnumRank, alertStatus } from '@/utils/enum';

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
              <Await resolve={{ id, ranks, items }}>
                <Secretary />
              </Await>
            ) : (
              <Await resolve={{ id, place }}>
                <BaseJudge />
              </Await>
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
  const props = useAsyncValue() as {
    id: string;
    place: IPlacesEvent;
  };
  const { id, place } = props;
  // console.log(place);

  const [partisipant, setPartisipant] = useState<IEntryPartisipant[] | null>(
    [],
  );
  const [cursor, setCursor] = useState<number>(0);

  const loadInitData = useCallback(async () => {
    async function getQueue() {
      return await judgeClient.getQueue(id);
    }

    if (cursor === 0) {
      setPartisipant(await getQueue());
      setCursor(1);
    }

    console.log(partisipant);
    console.log(cursor);
  }, [cursor, id]);

  useEffect(() => {
    loadInitData();
  }, [loadInitData]);

  const formik = useFormik({
    initialValues: {
      score: 0,
    },
    onSubmit: async (values) => {
      const { score } = values;
      console.log(score);
    },
  });

  return (
    <Suspense fallback={<h3 className={Style.heading}>Загрузка...</h3>}>
      <Await resolve={place}>
        {(resolvedPlace: IPlacesEvent) => (
          <>
            <form onSubmit={formik.handleSubmit} className={Style.container}>
              {partisipant?.map((item: IEntryPartisipant, index: number) => (
                <>
                  <h3 className={Style.heading}>
                    {`${item.partisipant.athlete.sirname} ${
                      item.partisipant.athlete.name
                    } ${
                      item.partisipant.athlete.patronymic
                        ? item.partisipant.athlete.patronymic
                        : ''
                    }`}
                  </h3>
                  <h3 className={Style.subTitle}>Предмет: {item.item.title}</h3>
                  <p key={index} className={Style.item}>
                    <label className={Style.label}>
                      Оценка
                      <input
                        type="number"
                        min="0"
                        max={resolvedPlace.placeId < 5 ? 20 : 10} //?
                        name="score"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.score}
                        className={Style.input({
                          border:
                            formik.touched.score && formik.errors.score
                              ? 'error'
                              : formik.touched.score &&
                                formik.values.score.toString() !== ''
                              ? 'success'
                              : 'default',
                        })}
                      />
                      {formik.touched.score && formik.errors.score ? (
                        <span className={Style.infoError}>
                          {formik.errors.score}
                        </span>
                      ) : (
                        <span className={Style.infoError} />
                      )}
                    </label>
                  </p>
                </>
              ))}
            </form>
          </>
        )}
      </Await>
    </Suspense>
  );
};

const Secretary = () => {
  const props = useAsyncValue() as {
    id: number;
    ranks: IRanks[];
    items: IItem[];
  };
  const { id, ranks, items } = props;

  interface IInitValues {
    rank: number;
    item: number;
  }

  const formik = useFormik({
    initialValues: {
      select: [] as IInitValues[],
    },
    onSubmit: async (values) => {
      const result = await judgeClient.setQueue(id, values.select);
      if (!result) {
        handleAlertMessage({
          alertText: 'Не корректные данные',
          alertStatus: alertStatus.warning,
        });
        return null;
      }
      const button = document.getElementById('button');
      if (button !== null) {
        button.setAttribute('disabled', 'disabled');
      }
      return handleAlertMessage({
        alertText: 'Жеребьевка составлена',
        alertStatus: alertStatus.success,
      });
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
