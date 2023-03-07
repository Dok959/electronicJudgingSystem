import { useEffect, useState } from 'react';
import { EventsList } from '@/components';
import { roleClient } from '@/api';
import { IRoles } from '@/types';

export const EventPage = () => {
  const [role, setRole] = useState<IRoles | null>(null);
  useEffect(() => {
    async function getRole() {
      setRole(await roleClient.getRole());
    }
    getRole();
  }, []);

  useEffect(() => {
    if (role?.title === 'Администратор') {
      const button = document.getElementById('create') as HTMLElement;
      button.style.display = 'flex';
    }
  }, [role]);

  return <EventsList />;
};
