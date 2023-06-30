import { Prisma, prisma } from '../../../../prisma';

/**
 *@example await deleteUsersService([
                                    {
                                      id: '1b963be4-3da1-4171-9dbc-b03f433adcd3',
                                    }
                                  ]);
 */
export async function deleteUsersService(data: Prisma.usersWhereUniqueInput[]) {
  return prisma.$transaction(data.map((user) => prisma.users.delete({ where: user })));
}
