import { prisma } from '../../../../../../prisma';
import { checkCannotExists } from '../../../../utils/validator';

interface ICheckNaturalPersonLenderEmailAlreadyUsedService {
  email: string;
  idToIgnore?: string;
}

export async function checkNaturalPersonLenderEmailAlreadyUsedService({
  email,
  idToIgnore,
}: ICheckNaturalPersonLenderEmailAlreadyUsedService) {
  const naturalPerson = await prisma.naturalPersonLender.findUnique({
    where: {
      email: email.toLowerCase(),
      NOT: idToIgnore ? { id: idToIgnore } : undefined,
    },
  });

  checkCannotExists([{ label: 'E-mail', value: naturalPerson }]);
}
