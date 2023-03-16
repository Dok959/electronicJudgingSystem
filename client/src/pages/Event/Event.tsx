import { useEffect } from 'react';
import { EventsList } from '@/components';
import { useStore } from 'effector-react';
import { $grant } from '@/context/auth';
import { useLocation, useMatches } from 'react-router-dom';

export const EventPage = () => {
  const isHasRights = useStore($grant);
  console.log(isHasRights);
  const location = useLocation();
  console.log(JSON.stringify(location, null, 2));

  // useEffect(() => {
  //   if (isHasRights) {
  //     const button = document.getElementById('create') as HTMLElement;
  //     button.style.display = 'flex';
  //   }
  // }, [isHasRights]);

  return <EventsList />;
};
