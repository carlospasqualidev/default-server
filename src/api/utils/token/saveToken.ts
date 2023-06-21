import { prisma } from '../../../../prisma';
import { ITokenService } from './types';

export async function saveTokenInDatabase({ token }: ITokenService) {
  await prisma.tokens.create({
    data: {
      token,
    },
  });
}
