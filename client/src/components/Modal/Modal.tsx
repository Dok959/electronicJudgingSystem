import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { handleAlertMessage } from '@/utils/auth';
import { handleModal } from '@/utils/modal';
import { ISelectUser } from '@/types/user';
import { Spinner } from '..';
import { judgeClient } from '@/api';
import { alertStatus } from '@/utils/enum';
import * as Style from './Modal.css';

export interface IProps {
  props: {
    masRows: ISelectUser[];
  };
}

export const Modal = ({ props }: IProps) => {
  const { id } = useParams();

  const { masRows } = props;

  const [spinner, setSpinner] = useState<boolean>(false);

  const clickHandler = () => {
    handleModal({
      masRows: [],
    });
  };

  const formik = useFormik({
    initialValues: {
      elements: [] as string[],
    },
    onSubmit: async (values) => {
      setSpinner(true);
      const { elements } = values;
      const usersId = elements.map((item) => Number(item));
      const data = usersId.map((item) => {
        return { eventId: Number(id), userId: item };
      });
      const result = await judgeClient.insertJudges(data);
      setSpinner(false);
      if (result) {
        clickHandler();
        return handleAlertMessage({
          alertText: 'Элементы добавлены',
          alertStatus: alertStatus.success,
        });
      }
      return handleAlertMessage({
        alertText: 'Не корректные данные',
        alertStatus: alertStatus.warning,
      });
    },
  });

  return (
    <div className={Style.wrapper}>
      <div className={Style.window}>
        <form onSubmit={formik.handleSubmit} className={Style.form}>
          <div className={Style.content}>
            {masRows.map((item: ISelectUser) => (
              <p key={item.id}>
                <input
                  type="checkbox"
                  id={item.id.toString()}
                  className={Style.input}
                  name="elements"
                  value={item.id}
                  onChange={(e) => {
                    formik.handleChange(e);
                    const elementId = String(item.id);
                    formik.values.elements.includes(elementId)
                      ? formik.values.elements.filter((el) => el !== elementId)
                      : formik.values.elements.push(elementId);
                  }}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor={item.id.toString()} className={Style.label}>{`${
                  item.sirname
                } ${item.name} ${
                  item.patronymic ? item.patronymic : ''
                }`}</label>
              </p>
            ))}
          </div>

          <button type="submit" className={Style.button}>
            {spinner ? <Spinner top={0} left={0} /> : 'Добавить'}
          </button>
        </form>
        <button className={Style.close} onClick={clickHandler}>
          <svg
            width="15"
            height="15"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 18L9.5 9.5L1 1M1 18L18 1"
              stroke="#24293D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
