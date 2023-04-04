import { useEffect } from 'react';
import { UsersList } from '@/components';
import { useStore } from 'effector-react';
import { $grant } from '@/context/auth';

export const UserPage = () => {
  const isHasRights = useStore($grant);
  console.log(isHasRights);

  useEffect(() => {
    if (isHasRights) {
      const button = document.getElementById('create');
      if (button !== null) {
        button.style.display = 'flex';
      }
    }
  }, [isHasRights]);

  return <UsersList />;
};
