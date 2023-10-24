import { prisma } from '.';
import { upsertPermissions, upsertBackofficeUser, upsertGenders } from './seeds';

const main = async () => {
  await upsertPermissions();
  await upsertGenders();
  await upsertBackofficeUser();
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
