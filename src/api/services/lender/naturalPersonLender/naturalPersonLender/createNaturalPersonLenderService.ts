import { IPrisma, prisma } from '../../../../../../prisma';

export async function createNaturalPersonLenderService(
  args: IPrisma.NaturalPersonLenderCreateArgs,
) {
  return prisma.naturalPersonLender.create(args);
}
