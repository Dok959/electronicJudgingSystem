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

  const [isCreateForm, setIsCreateForm] = useState<boolean>(false);

  const clickHandler = () => {
    return setIsCreateForm(true);
  };

  useEffect(() => {
    if (isCreateForm === false && role?.title === 'Администратор') {
      const button = document.getElementById('create') as HTMLElement;
      button.style.display = 'flex';
      button.onclick = clickHandler;
    } else {
      const button = document.getElementById('create') as HTMLElement;
      button.style.display = 'none';
    }
  });

  return (
    <>
      {isCreateForm ? (
        <div>Форма создания</div>
      ) : (
        <>
          <EventsList />
        </>
      )}
    </>
  );
};
