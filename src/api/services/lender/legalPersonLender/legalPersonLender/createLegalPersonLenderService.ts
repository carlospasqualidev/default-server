import { IPrisma, prisma } from '../../../../../../prisma';

export async function createLegalPersonLenderService(args: IPrisma.LegalPersonLenderCreateArgs) {
  return prisma.legalPersonLender.create(args);
}
