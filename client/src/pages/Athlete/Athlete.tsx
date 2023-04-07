import { AthletesList } from '@/components';

export const AthletesPage = () => {
  const button = document.getElementById('create');
  if (button !== null) {
    button.style.display = 'flex';
  }

  return <AthletesList />;
};
