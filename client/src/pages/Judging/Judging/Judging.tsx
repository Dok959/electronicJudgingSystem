import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
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

  const [partisipants, setPartisipants] = useState<IEntryPartisipant[] | null>(
    [],
  );
  // let partisipants = useRef<IEntryPartisipant[] | null>([]);
  const [cursor, setCursor] = useState<number>(-1);
  // let cursor = useRef<number>(-1);
  const [renderPartisipant, setRenderPartisipant] =
    useState<IEntryPartisipant | null>(null);

  const loadInitData = useCallback(async () => {
    async function getQueue() {
      return await judgeClient.getQueue(id);
    }

    setPartisipants(await getQueue());
    setCursor(0);
  }, [id]);

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

  // const partisipantRenderInit = () => {
  //   return (
  //     <>
  //       <h3 className={Style.heading}>
  //         {/* {`${item.partisipant.athlete.sirname} ${
  //           item.partisipant.athlete.name
  //         } ${
  //           item.partisipant.athlete.patronymic
  //             ? item.partisipant.athlete.patronymic
  //             : ''
  //         }`} */}
  //         Gthfjsdfsd sdfsdf sadasd
  //       </h3>
  //       {/* <h3 className={Style.subTitle}>Предмет: {item.item.title}</h3> */}
  //       <h3 className={Style.subTitle}>Предмет: asdasdsad</h3>
  //     </>
  //   );
  // };

  // useEffect(() => {
  //   // const loadInitData = useCallback(async () => {
  //   //   partisipantRender();
  //   // });
  //   console.log(cursor);
  //   const item = partisipants![cursor];
  //   console.log(item);
  //   setRenderPartisipant(item);
  // }, [cursor, partisipants]);

  // useEffect(() => {
  //   const partisipantRender = () => {
  //     return (
  //       <>
  //         <h3 className={Style.heading}>
  //           {/* {`${item.partisipant.athlete.sirname} ${
  //           item.partisipant.athlete.name
  //         } ${
  //           item.partisipant.athlete.patronymic
  //             ? item.partisipant.athlete.patronymic
  //             : ''
  //         }`} */}
  //           Gthfjsdfsd sdfsdf sadasd
  //         </h3>
  //         {/* <h3 className={Style.subTitle}>Предмет: {item.item.title}</h3> */}
  //         <h3 className={Style.subTitle}>Предмет: asdasdsad</h3>
  //       </>
  //     );
  //   };

  //   partisipantRender();
  // }, [renderPartisipant]);

  const handlerPrev = () => {
    if (cursor > 0) {
      setCursor(cursor - 1);
    }
  };
  const handlerNext = () => {
    if (cursor < partisipants!.length) {
      setCursor(cursor + 1);
    }
  };

  useEffect(() => {
    console.log(partisipants);
    console.log(cursor);
    console.log(renderPartisipant?.partisipant.athlete);

    if (cursor !== -1) {
      setRenderPartisipant(partisipants![cursor]);
    }
  }, [cursor, partisipants]);

  return (
    <Suspense fallback={<h3 className={Style.heading}>Загрузка...</h3>}>
      <Await resolve={place}>
        {(resolvedPlace: IPlacesEvent) => (
          <>
            <div className={Style.arrows}>
              <div className={Style.arrow} onClick={handlerPrev}>
                <svg
                  width="13"
                  height="21"
                  viewBox="0 0 13 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.2259 0.895258C12.503 1.15876 12.6416 1.47075 12.6416 1.83123C12.6416 2.191 12.503 2.50264 12.2259 2.76614L4.10581 10.4868L12.2536 18.2339C12.5123 18.4798 12.6416 18.7872 12.6416 19.1561C12.6416 19.525 12.503 19.8412 12.2259 20.1047C11.9488 20.3682 11.6206 20.5 11.2415 20.5C10.8631 20.5 10.5354 20.3682 10.2582 20.1047L0.946452 11.2246C0.835598 11.1192 0.756891 11.005 0.710333 10.8821C0.664513 10.7591 0.641602 10.6274 0.641602 10.4868C0.641602 10.3463 0.664513 10.2145 0.710333 10.0916C0.756891 9.9686 0.835598 9.85441 0.946452 9.74901L10.2859 0.868908C10.5446 0.62297 10.8631 0.5 11.2415 0.5C11.6206 0.5 11.9488 0.631754 12.2259 0.895258Z"
                    fill="#24293D"
                  />
                </svg>
              </div>
              <div className={Style.arrow} onClick={handlerNext}>
                <svg
                  width="13"
                  height="21"
                  viewBox="0 0 13 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.05731 20.1047C0.78017 19.8412 0.641602 19.5292 0.641602 19.1688C0.641602 18.809 0.78017 18.4974 1.05731 18.2339L9.1774 10.5132L1.02959 2.76614C0.770932 2.5202 0.641602 2.21278 0.641602 1.84387C0.641602 1.47497 0.78017 1.15876 1.05731 0.895257C1.33444 0.631752 1.66257 0.5 2.04169 0.5C2.42008 0.5 2.74784 0.631752 3.02497 0.895257L12.3368 9.77536C12.4476 9.88076 12.5263 9.99495 12.5729 10.1179C12.6187 10.2409 12.6416 10.3726 12.6416 10.5132C12.6416 10.6537 12.6187 10.7855 12.5729 10.9084C12.5263 11.0314 12.4476 11.1456 12.3368 11.251L2.99726 20.1311C2.7386 20.377 2.42008 20.5 2.04169 20.5C1.66257 20.5 1.33444 20.3682 1.05731 20.1047Z"
                    fill="#24293D"
                  />
                </svg>
              </div>
            </div>

            <div className={Style.athlete}>
              <h3 className={Style.subTitle}>
                Разряд:{' '}
                {
                  EnumRank[
                    renderPartisipant?.partisipant.athlete.rank
                      .title as keyof typeof EnumRank
                  ]
                }
              </h3>
              <h3 className={Style.heading}>
                {`${renderPartisipant?.partisipant.athlete.sirname} ${
                  renderPartisipant?.partisipant.athlete.name
                } ${
                  renderPartisipant?.partisipant.athlete.patronymic
                    ? renderPartisipant?.partisipant.athlete.patronymic
                    : ''
                }`}
              </h3>
              <h3 className={Style.subTitle}>
                Предмет: {renderPartisipant?.item.title}
              </h3>
            </div>

            {/* {partisipants ?? (
              <>
                <div
                  className={Style.button({ type: 'secondary' })}
                  onClick={handler}
                >
                  3-й элемент
                </div>

                <form
                  onSubmit={formik.handleSubmit}
                  className={Style.container}
                >
                  <p className={Style.item}>
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
                </form>
              </>
            )} */}
          </>
        )}
        {/* {partisipant?.map((item: IEntryPartisipant, index: number) => (
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
                      {partisipantRender(item)}
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
                  ))} */}
        {/* {partisipantRenderInit()} */}
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
