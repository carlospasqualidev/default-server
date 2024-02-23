import { prisma } from '../../../../../../prisma';
import { checkCannotExists } from '../../../../utils/validator';

interface ICheckLegalPersonLenderEmailAlreadyUsedService {
  email: string;
  idToIgnore?: string;
}

export async function checkLegalPersonLenderEmailAlreadyUsedService({
  email,
  idToIgnore,
}: ICheckLegalPersonLenderEmailAlreadyUsedService) {
  const legalPerson = await prisma.legalPersonLender.findUnique({
    where: {
      email: email.toLowerCase(),
      NOT: idToIgnore ? { id: idToIgnore } : undefined,
    },
  });

  checkCannotExists([{ label: 'E-mail', value: legalPerson }]);
}
