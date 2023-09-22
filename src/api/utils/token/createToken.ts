import { prisma } from '../../../../prisma';
import { ITokenService } from './types';

export async function createToken({ token }: ITokenService) {
  await prisma.tokens.create({
    data: {
      token,
    },
  });
}
