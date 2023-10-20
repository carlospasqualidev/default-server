import { IPrisma, prisma } from '../../../../prisma';

export async function updateUsersService(args: IPrisma.usersUpdateArgs) {
  return prisma.users.update(args);
}
