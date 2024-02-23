import { prisma } from '../../../../../../prisma';
import { checkCannotExists } from '../../../../utils/validator';

interface ICheckLegalPersonBorrowerEmailAlreadyUsedService {
  email: string;
  idToIgnore?: string;
}

export async function checkLegalPersonBorrowerEmailAlreadyUsedService({
  email,
  idToIgnore,
}: ICheckLegalPersonBorrowerEmailAlreadyUsedService) {
  const legalPersonBorrower = await prisma.legalPersonBorrower.findUnique({
    where: {
      email: email.toLowerCase(),
      NOT: idToIgnore ? { id: idToIgnore } : undefined,
    },
  });

  checkCannotExists([{ label: 'E-mail', value: legalPersonBorrower }]);
}
