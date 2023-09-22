import { Prisma, prisma } from '../../../../prisma';

export async function createUsersService(args: Prisma.usersCreateArgs[]) {
  return prisma.$transaction(args.map((arg) => prisma.users.create(arg)));
}
