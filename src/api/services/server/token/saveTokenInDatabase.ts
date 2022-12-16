import { ITokenService } from './types';
import { Prisma } from '../../../../../prisma';

export async function saveTokenInDatabase({ token }: ITokenService) {
  await Prisma.validationToken.create({
    data: {
      token,
    },
  });
}
