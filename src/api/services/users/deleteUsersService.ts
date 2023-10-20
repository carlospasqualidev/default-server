import { IPrisma, prisma } from '../../../../prisma';

// #region Interfaces
interface IDeleteUsers {
  where: IPrisma.usersWhereUniqueInput;
}
// #endregion

export async function deleteUsersService({ where }: IDeleteUsers) {
  return prisma.users.delete({
    where,
  });
}
