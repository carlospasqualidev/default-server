import { ITokenService } from './types';
import { Prisma } from '../../../../../prisma';
import { ErrorMessage } from '../error/ErrorMessage';

export const findToken = async ({ token }: ITokenService) => {
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
};
