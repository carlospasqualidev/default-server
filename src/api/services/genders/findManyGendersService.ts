import { prisma } from '../../../../prisma';

export async function findManyGendersService() {
  return prisma.genders.findMany({
    select: {
      id: true,
      label: true,
      name: true,
    },
  });
}
