import { IToken } from './types';
import { Prisma } from '../../../../../prisma';

export async function saveTokenInDatabase({ token }: IToken) {
  await Prisma.validationToken.create({
    data: {
      token,
    },
  });
}
