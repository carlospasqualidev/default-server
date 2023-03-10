import { ITokenService } from './types';
import { Prisma } from '../../../../../prisma';

export const saveTokenInDatabase = async ({ token }: ITokenService) => {
  await Prisma.validationToken.create({
    data: {
      token,
    },
  });
};
