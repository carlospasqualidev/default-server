import { prisma, IPrisma } from '../../../../prisma';

// #region Interfaces
interface IFindManyPersonPermissions {
  where?: IPrisma.personPermissionsWhereInput | undefined;
}
// endregion

export function findManyPersonPermissionsService({ where }: IFindManyPersonPermissions) {
  return prisma.personPermissions.findMany({
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
