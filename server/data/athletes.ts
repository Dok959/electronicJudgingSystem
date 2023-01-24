import { Rank } from '@prisma/client';

export const athletes = [
  {
    name: 'Иван',
    sirname: 'Иванов',
  },
  {
    name: 'Сидор',
    sirname: 'Сидоров',
    rank: Rank.KMC,
  },
];
