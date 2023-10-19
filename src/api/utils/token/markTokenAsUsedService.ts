import { prisma } from '../../../../prisma';

export async function markTokenAsUsed(token: string) {
  await prisma.tokens.update({
    data: {
      hasUsed: true,
    },
    where: {
      token,
    },
  });
}
