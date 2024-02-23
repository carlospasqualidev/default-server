import { prisma } from '../../../../prisma';
import { ErrorMessage } from '../../utils/error';

interface IFindUserByCredentialService {
  credential: string;
}
export async function findUserByCredentialService({ credential }: IFindUserByCredentialService) {
  const user = await prisma.user.findFirst({
    select: {
      id: true,
      email: true,
      password: true,
      isBlocked: true,
    },

    where: {
      email: credential,
    },
  });

  if (!user) {
    throw new ErrorMessage({ statusCode: '401 UNAUTHORIZED', message: 'Credenciais inválidas.' });
  }

  return user!;
}
