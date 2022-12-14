import { IToken } from './types';
import { Prisma } from '../../../../../prisma';

export async function markTokenAsUsed({ token }: IToken) {
  await Prisma.validationToken.update({
    data: {
      hasUsed: true,
    },
    where: {
      token,
    },
  });
}
