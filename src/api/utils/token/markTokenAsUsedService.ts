import { prisma } from '../../../../prisma';

export async function markTokenAsUsed({ token }: { token: string }) {
  await prisma.token.update({
    data: {
      hasUsed: true,
    },
    where: {
      token,
    },
  });
}
