import { IPrisma, prisma } from '../../../../../../prisma';

export async function createNaturalPersonBorrowerService(
  args: IPrisma.NaturalPersonBorrowerCreateArgs,
) {
  return prisma.naturalPersonBorrower.create(args);
}
