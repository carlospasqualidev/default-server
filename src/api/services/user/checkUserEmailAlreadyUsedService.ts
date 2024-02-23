import { prisma } from '../../../../prisma';
import { checkCannotExists } from '../../utils/validator';

interface ICheckUserEmailAlreadyUsedService {
  email: string;
  idToIgnore?: string;
}

export async function checkUserEmailAlreadyUsedService({
  email,
  idToIgnore,
}: ICheckUserEmailAlreadyUsedService) {
  const user = await prisma.user.findUnique({
    where: {
      email: email.toLowerCase(),
      NOT: idToIgnore ? { id: idToIgnore } : undefined,
    },
  });

  checkCannotExists([{ label: 'E-mail', value: user }]);
}
