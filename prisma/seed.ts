import { prisma } from '.';
import { createAdmin } from './seeds';

const main = async () => {
  await createAdmin();
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
