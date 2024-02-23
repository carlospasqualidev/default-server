import { prisma } from '../../../../../../prisma';
import { checkCannotExists } from '../../../../utils/validator';

interface ICheckNaturalPersonBorrowerEmailAlreadyUsedService {
  email: string;
  idToIgnore?: string;
}

export async function checkNaturalPersonBorrowerEmailAlreadyUsedService({
  email,
  idToIgnore,
}: ICheckNaturalPersonBorrowerEmailAlreadyUsedService) {
  const naturalPersonBorrower = await prisma.naturalPersonBorrower.findUnique({
    where: {
      email: email.toLowerCase(),
      NOT: idToIgnore ? { id: idToIgnore } : undefined,
    },
  });

  checkCannotExists([{ label: 'E-mail', value: naturalPersonBorrower }]);
}
