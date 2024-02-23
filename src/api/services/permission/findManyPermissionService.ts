import { prisma } from '../../../../prisma';

export async function findManyPermissionsService() {
  return prisma.permission.findMany({
    select: {
      id: true,
      name: true,
      label: true,
    },
  });
}
