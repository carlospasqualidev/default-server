import { prisma } from '../../../../prisma';
import { ErrorMessage } from '../error';

export async function findTokenService({ token }: { token: string }) {
  const tokenData = await prisma.token.findFirst({
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
