import { IPrisma, prisma } from '../../../../prisma';

export async function createUsersService(args: IPrisma.usersCreateArgs) {
  return prisma.users.create(args);
}
