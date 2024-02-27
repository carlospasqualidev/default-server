import { hashSync } from 'bcrypt';
import { prisma } from '../prismaConfig';
import { findManyPermissionService } from '../../src/api/services/permission';

export async function createAdmin() {
  const permissions = await findManyPermissionService();

  await prisma.user.upsert({
    create: {
      name: 'Admin',
      email: 'admin@gmail.com',
      password: hashSync('123123123', 12),
      userPermissions: {
        createMany: {
          data: permissions.map(({ permission }) => ({
            permission,
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
