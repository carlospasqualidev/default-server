import { IPrisma, prisma } from '../../../../prisma';

export async function createUserAccessService(args: IPrisma.UserAccessCreateArgs) {
  return prisma.userAccess.create(args);
}
