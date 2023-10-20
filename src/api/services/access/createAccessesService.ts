import { IPrisma, prisma } from '../../../../prisma';

export async function createAccessesService(args: IPrisma.accessesCreateArgs) {
  return prisma.accesses.create(args);
}
