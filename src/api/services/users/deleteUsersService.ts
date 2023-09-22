import { Prisma, prisma } from '../../../../prisma';

export async function deleteUsersService(args: Prisma.usersDeleteArgs[]) {
  return prisma.$transaction(args.map((arg) => prisma.users.delete(arg)));
}
