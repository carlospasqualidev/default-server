import { IPrisma, prisma } from '../../../../prisma';

export async function createTokenService(data: IPrisma.TokenUncheckedCreateInput) {
  return prisma.token.create({
    data,
  });
}
