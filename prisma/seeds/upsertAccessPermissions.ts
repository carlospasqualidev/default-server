/* eslint-disable no-console */
import { prisma } from '../prismaConfig';

export async function upsertAccessPermissions() {
  const permissions = [
    {
      name: 'backoffice',
    },
  ];

  for (let i = 0; i < permissions.length; i++) {
    await prisma.accessPermissions.upsert({
      create: {
        name: permissions[i].name,
      },
      update: {},
      where: {
        name: permissions[i].name,
      },
    });
  }
}
