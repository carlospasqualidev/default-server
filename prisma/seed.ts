import { prisma } from '.';
import {
  upsertAccessPermissions,
  upsertBackofficeUser,
  upsertGenders,
  upsertPersonPermissions,
} from './seeds';

const main = async () => {
  await upsertAccessPermissions();
  await upsertPersonPermissions();
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
