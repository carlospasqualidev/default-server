import { prisma, IPrisma } from '../../../../prisma';

// #region Interfaces
interface IFindAccessPermissions {
  where?: IPrisma.accessPermissionsWhereInput | undefined;
}
// endregion

export function findAccessPermissionsService({ where }: IFindAccessPermissions) {
  return prisma.accessPermissions.findFirst({
    select: {
      id: true,
      name: true,
    },
    where,
  });
}
