import { prisma, IPrisma } from '../../../../prisma';

// #region Interfaces
interface IFindManyAccessPermissions {
  where?: IPrisma.accessPermissionsWhereInput | undefined;
}
// endregion

export function findManyAccessPermissionsService({ where }: IFindManyAccessPermissions) {
  return prisma.accessPermissions.findMany({
    select: {
      id: true,
      name: true,
    },
    where,
  });
}
