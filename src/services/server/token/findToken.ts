import { IToken } from './types';
import { Prisma } from '../../../../prisma';
import { ErrorMessage } from '../messages/ErrorMessage';

export async function findToken({ token }: IToken) {
  const tokenData = await Prisma.validationToken.findFirst({
    where: {
      token,
      hasUsed: false,
    },
  });

  if (tokenData === null || tokenData === undefined) {
    throw new ErrorMessage({
      statusCode: 400,
      message: 'Token de ativação inválido ou já utilizado.',
    });
  }

  return tokenData;
}
