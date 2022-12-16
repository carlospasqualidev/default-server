import { ITokenService } from './types';
import { Prisma } from '../../../../../prisma';

export async function markTokenAsUsed({ token }: ITokenService) {
  await Prisma.validationToken.update({
    data: {
      hasUsed: true,
    },
    where: {
      token,
    },
  });
}
