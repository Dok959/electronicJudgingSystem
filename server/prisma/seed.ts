import { PrismaClient } from '@prisma/client';
import { roles, ranks, items, types } from '../data';

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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect);
