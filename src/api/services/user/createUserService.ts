import { IPrisma, prisma } from '../../../../prisma';

export async function createUserService(args: IPrisma.UserCreateArgs) {
  return prisma.user.create(args);
}
