import { useEffect } from 'react';
import { EventsList } from '@/components';
import { useStore } from 'effector-react';
import { $grant } from '@/context/auth';

export const EventPage = () => {
  const isHasRights = useStore($grant);

  useEffect(() => {
    if (isHasRights) {
      const button = document.getElementById('create') as HTMLElement;
      button.style.display = 'flex';
    }
  }, [isHasRights]);

  return <EventsList />;
};
