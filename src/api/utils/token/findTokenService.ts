import { ErrorMessage } from '../error/ErrorMessage';
import { prisma } from '../../../../prisma';

export async function findTokenService(token: string) {
  const tokenData = await prisma.tokens.findFirst({
    where: {
      token,
      hasUsed: false,
    },
  });

  if (!tokenData) {
    throw new ErrorMessage({
      statusCode: '403 FORBIDDEN',
      message: 'Token de ativação inválido ou já utilizado.',
    });
  }

  return tokenData;
}
