import { hashSync } from 'bcrypt';

import { findManyPermissionsService } from '../../src/api/services/permission';
import { prisma } from '../prismaConfig';

export async function createAdmin() {
  const permissions = await findManyPermissionsService();

  await prisma.user.upsert({
    create: {
      name: 'Admin',
      email: 'admin@gmail.com',
      password: hashSync('123123123', 12),
      userPermissions: {
        createMany: {
          data: permissions.map((permission) => ({
            permissionId: permission.id,
          })),
        },
      },
    },
    update: {},
    where: {
      email: 'admin@gmail.com',
    },
  });
}
