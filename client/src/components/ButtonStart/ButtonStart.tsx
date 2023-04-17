import { SyntheticEvent } from 'react';
import * as Style from './ButtonStart.css';
import { useNavigate } from 'react-router-dom';

export const ButtonStart = () => {
  const navigate = useNavigate();

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    navigate('/places');
    return;
  };

  return (
    <button className={Style.button} type="submit" onClick={handleClick}>
      К соревнованию
    </button>
  );
};
