import { Prisma, prisma } from '../../../../prisma';

export async function updateUsersService(args: Prisma.usersUpdateArgs[]) {
  return prisma.$transaction(args.map((arg) => prisma.users.update(arg)));
}
