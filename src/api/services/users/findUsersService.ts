import { Prisma, prisma } from '../../../../prisma';

// verificar se encontrou resultados
export async function findUsersService(args: Prisma.usersFindManyArgs[]) {
  return prisma.$transaction(args.map((arg) => prisma.users.findMany(arg)));
}
