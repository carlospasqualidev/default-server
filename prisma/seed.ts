/* eslint-disable no-console */
import { hashSync } from 'bcrypt';
import { Prisma } from './index';
import { findPermissionByName } from '../src/api/services/database/permissions';

async function createManyPermissions() {
  await Prisma.permission.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
    },
  });

  await Prisma.permission.upsert({
    where: { name: 'user' },
    update: {},
    create: {
      name: 'user',
    },
  });

  console.log('Permissions inserted.');
}

async function createAdmin() {
  const permissionAdmin = await findPermissionByName({ name: 'admin' });

  await Prisma.user.upsert({
    where: { email: 'admin@ada.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@ada.com',
      image: null,
      customUrl: 'admin_url',
      password: hashSync('123123123', 12),
      Permissions: {
        create: {
          permissionId: permissionAdmin.id,
        },
      },
    },
  });

  console.log('Admin inserted.');
}

async function main() {
  await createManyPermissions();
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
