/* eslint-disable no-console */
import { Prisma } from './index';
import { createAdmin, createPermissions } from '../src/controllers/seed';

async function main() {
  await createPermissions();
  await createAdmin();
}
main()
  .then(async () => {
    await Prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await Prisma.$disconnect();
    process.exit(1);
  });
