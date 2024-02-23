import { IPrisma, prisma } from '../../../../../../prisma';

export async function createLegalPersonBorrowerService(
  args: IPrisma.LegalPersonBorrowerCreateArgs,
) {
  return prisma.legalPersonBorrower.create(args);
}
