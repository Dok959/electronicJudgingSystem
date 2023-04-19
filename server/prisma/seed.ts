import { PrismaClient } from '@prisma/client';
import { roles, ranks, items, types, places } from '../data';

const prisma = new PrismaClient();

async function main() {
  await prisma.role.createMany({
    data: roles,
  });
  await prisma.rank.createMany({
    data: ranks,
  });
  await prisma.item.createMany({
    data: items,
  });
  await prisma.typesEvent.createMany({
    data: types,
  });
  await prisma.place.createMany({
    data: places,
  });

  const adminRole = await prisma.role.findFirst({
    where: { title: 'Администратор' },
    select: { id: true },
  });

  await prisma.user.create({
    data: {
      email: 'temp@mail.ru',
      password: 'admin',
      name: 'gfdg',
      sirname: 'asdsdzxczc',
      roleId: adminRole.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect);
