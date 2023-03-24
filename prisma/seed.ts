import { prisma } from '.';
import { createAdminService, createManyPermissionsService } from '../src/api/database/seeds';

const main = async () => {
  await createManyPermissionsService();
  await createAdminService();
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
