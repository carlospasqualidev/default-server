import { ITokenService } from './types';
import { ErrorMessage } from '../error/ErrorMessage';
import { prisma } from '../../../../prisma';

export async function findToken({ token }: ITokenService) {
  const tokenData = await prisma.tokens.findFirst({
    where: {
      token,
      hasUsed: false,
    },
  });

  if (!tokenData) {
    throw new ErrorMessage({
      statusCode: 400,
      message: 'Token de ativação inválido ou já utilizado.',
    });
  }

  return tokenData;
}
