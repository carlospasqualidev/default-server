import { ITokenService } from './types';
import { Prisma } from '../../../../../prisma';

export const markTokenAsUsed = async ({ token }: ITokenService) => {
  await Prisma.validationToken.update({
    data: {
      hasUsed: true,
    },
    where: {
      token,
    },
  });
};
