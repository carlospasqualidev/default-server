import { prisma, IPrisma } from '../../../../prisma';

// #region Interfaces
interface IFindPermissions {
  where?: IPrisma.permissionsWhereInput | undefined;
}
// endregion

export function findPermissionsService({ where }: IFindPermissions) {
  return prisma.permissions.findFirst({
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
