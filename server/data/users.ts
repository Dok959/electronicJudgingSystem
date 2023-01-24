import { Role } from '@prisma/client';

export const users = [
  {
    email: 'temp@mail.ru',
    password: 'admin',
    name: 'Иван',
    sirname: 'Иванов',
  },
  {
    email: 'judje@mail.ru',
    password: 'admin',
    role: Role.USER,
    name: 'Абракадарба',
    sirname: ' ',
  },
  {
    email: 'admin@mail.ru',
    password: 'admin',
    role: Role.ADMIN,
    name: 'Петров',
    sirname: 'Птр',
  },
];
