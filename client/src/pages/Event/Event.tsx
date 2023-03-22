import { useEffect } from 'react';
import { EventsList } from '@/components';
import { useStore } from 'effector-react';
import { $grant } from '@/context/auth';

export const EventPage = () => {
  const isHasRights = useStore($grant);

  useEffect(() => {
    if (isHasRights) {
      const button = document.getElementById('create');
      if (button !== null) {
        button.style.display = 'flex';
      }
    }
  }, [isHasRights]);

  return <EventsList />;
};
