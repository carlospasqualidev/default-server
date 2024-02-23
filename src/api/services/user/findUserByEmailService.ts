import { prisma } from '../../../../prisma';
import { checkNeedExists } from '../../utils/validator';

interface IFindUserByEmailService {
  email: string;
}

export async function findUserByEmailService({ email }: IFindUserByEmailService) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  checkNeedExists([
    {
      label: 'Usuário',
      value: user,
    },
  ]);

  return user!;
}
