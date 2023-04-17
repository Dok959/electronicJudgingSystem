import { useCallback, useEffect, useState } from 'react';
import { ButtonStart, EventsList } from '@/components';
import { useStore } from 'effector-react';
import { $grant } from '@/context/auth';
import { judgeClient } from '@/api';
import { ISelectEvent } from '@/types/event';

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

  const [isJudge, setIsJudge] = useState<ISelectEvent | null>(null);

  const loadInitData = useCallback(async () => {
    setIsJudge(await getJudge());
  }, []);

  useEffect(() => {
    loadInitData();
  }, [loadInitData]);

  return (
    <>
      {isJudge ? <ButtonStart /> : <></>}
      <EventsList />
    </>
  );
};

async function getJudge() {
  return await judgeClient.getJudge();
}
