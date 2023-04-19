import { SyntheticEvent } from 'react';
import * as Style from './ButtonStart.css';
import { useNavigate } from 'react-router-dom';

export const ButtonStart = ({ eventId }: { eventId: number }) => {
  const navigate = useNavigate();

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    navigate(`/events/${eventId}/places`);
    return;
  };

  return (
    <button className={Style.button} type="submit" onClick={handleClick}>
      К соревнованию
    </button>
  );
};
