import { useEffect, useState } from 'react';
import { EventsList } from '@/components';
import { roleClient } from '@/api';
import { IRoles } from '@/types';
import * as Style from './Event.css';

export const EventPage = () => {
  const [role, setRole] = useState<IRoles | null>(null);
  useEffect(() => {
    async function getRole() {
      setRole(await roleClient.getRole());
    }
    getRole();
  }, []);

  return (
    <>
      <EventsList />
      {role?.title === 'Администратор' ? <button>Создать</button> : <>{null}</>}
    </>
  );
};
