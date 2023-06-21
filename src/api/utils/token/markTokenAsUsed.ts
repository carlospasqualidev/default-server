import { prisma } from '../../../../prisma';
import { ITokenService } from './types';

export async function markTokenAsUsed({ token }: ITokenService) {
  await prisma.tokens.update({
    data: {
      hasUsed: true,
    },
    where: {
      token,
    },
  });
}
