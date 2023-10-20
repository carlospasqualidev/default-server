import { prisma, IPrisma } from '../../../../prisma';

// #region Interfaces
interface IFindPersonPermissions {
  where?: IPrisma.personPermissionsWhereInput | undefined;
}
// endregion

export function findPersonPermissionsService({ where }: IFindPersonPermissions) {
  return prisma.personPermissions.findFirst({
    select: {
      id: true,
      name: true,
      type: true,

      subPermissions: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    where,
  });
}
