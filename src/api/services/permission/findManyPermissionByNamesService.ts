import { prisma } from '../../../../prisma';
import { TPermissions } from '../../../types/permissions';

interface IFindManyPermissionByNames {
  names: TPermissions[];
}

export async function findManyPermissionByNamesService({ names }: IFindManyPermissionByNames) {
  return prisma.permission.findMany({
    select: {
      id: true,
      name: true,
    },
    where: {
      name: {
        in: names,
      },
    },
  });
}
