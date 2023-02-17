import { useLoaderData } from 'react-router-dom';
import { Event } from '@/types/eventsList';
import * as Style from './Events.css';

export const EventsList = () => {
  const events: Event[] = useLoaderData() as Event[];
  console.log(events);

  const parseDateTime = (dateTime: Date, isDate: boolean) => {
    const date = new Date(dateTime);
    if (isDate) {
      return date.toLocaleString().split(', ')[0];
    } else {
      return date.toLocaleString().split(', ')[1];
    }
  };

  return (
    <>
      {events?.length ? (
        <section className={Style.wrapper}>
          <h3 className={Style.heading}>Соревнования</h3>
          <div className={Style.container}>
            <aside className={Style.filter}>
              <p className={Style.item}>
                <input type="checkbox" id="mc" className={Style.input} />
                <label htmlFor="mc" className={Style.label}>
                  МС
                </label>
              </p>
              <p className={Style.item}>
                <input type="checkbox" id="kmc" className={Style.input} />
                <label htmlFor="kmc" className={Style.label}>
                  КМС
                </label>
              </p>
              <p className={Style.item}>
                <input type="checkbox" id="1c" className={Style.input} />
                <label htmlFor="1c" className={Style.label}>
                  1C
                </label>
              </p>
              <p className={Style.item}>
                <input type="checkbox" id="2c" className={Style.input} />
                <label htmlFor="2c" className={Style.label}>
                  2C
                </label>
              </p>
              <p className={Style.item}>
                <input type="checkbox" id="3c" className={Style.input} />
                <label htmlFor="3c" className={Style.label}>
                  3C
                </label>
              </p>
              <p className={Style.item}>
                <input type="checkbox" id="1y" className={Style.input} />
                <label htmlFor="1y" className={Style.label}>
                  1Ю
                </label>
              </p>
              <p className={Style.item}>
                <input type="checkbox" id="2y" className={Style.input} />
                <label htmlFor="2y" className={Style.label}>
                  2Ю
                </label>
              </p>
              <p className={Style.item}>
                <input type="checkbox" id="3y" className={Style.input} />
                <label htmlFor="3y" className={Style.label}>
                  3Ю
                </label>
              </p>
              <p className={Style.item}>
                <input type="checkbox" id="no" className={Style.input} />
                <label htmlFor="no" className={Style.label}>
                  БР
                </label>
              </p>
            </aside>

            <div className={Style.content}>
              {events.map((item) => (
                <article className={Style.event} key={item.id}>
                  <h4 className={Style.eventTitle}>{item.title}</h4>
                  <div className={Style.infoContainer}>
                    <div className={Style.flexContainer({})}>
                      <p className={Style.info}>
                        Дата:{' '}
                        <span>{parseDateTime(item.startDateTime, true)}</span>
                      </p>
                      <p className={Style.info}>
                        Время:{' '}
                        <span>{parseDateTime(item.startDateTime, false)}</span>
                      </p>
                    </div>

                    <div className={Style.flexContainer({ flex: 'wrap' })}>
                      <p className={Style.info}>
                        Квалификация: <span>КМС, 1С, 2С, 3Ю</span>
                      </p>
                      <div className={Style.tags}>
                        <p className={Style.tag}>Индивидуальное</p>
                        <p className={Style.tag}>Групповое</p>
                        <a href="/" className={Style.detail}>
                          Подробнее
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <div>{null}</div>
      )}
    </>
  );
};
