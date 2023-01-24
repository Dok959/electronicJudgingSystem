import { PrismaClient } from '@prisma/client';
import { users, athletes } from '../data';

const prisma = new PrismaClient();

async function main() {
  await prisma.athlete.createMany({
    data: athletes,
  });
  await prisma.user.createMany({
    data: users,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect);
