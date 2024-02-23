import { prisma } from '../../../../prisma';
import { checkNeedExists } from '../../utils/validator';

interface IFindUserById {
  userId: string;
}

export async function findUserByIdService({ userId }: IFindUserById) {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
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
