import { prisma, IPrisma } from '../../../../prisma';

// #region Interfaces
interface IFindManyPermissions {
  where?: IPrisma.permissionsWhereInput | undefined;
}
// endregion

export function findManyPermissionsService({ where }: IFindManyPermissions) {
  return prisma.permissions.findMany({
    select: {
      id: true,
      name: true,
      type: true,

      sublevels: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    where,
  });
}
