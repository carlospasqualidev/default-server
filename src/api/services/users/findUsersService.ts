import { prisma, IPrisma } from '../../../../prisma';

// #region Interfaces
interface IFindUsersService {
  where: IPrisma.usersWhereInput | undefined;
}
// endregion

export async function findUsersService({ where }: IFindUsersService) {
  return prisma.users.findFirst({
    include: {
      person: {
        include: {
          companies: true,
          gender: true,
          address: true,
        },
      },
    },
    where,
  });
}
