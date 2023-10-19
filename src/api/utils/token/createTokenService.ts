import { IPrisma, prisma } from '../../../../prisma';

export async function createTokenService(data: IPrisma.tokensUncheckedCreateInput) {
  return prisma.tokens.create({
    data,
  });
}
