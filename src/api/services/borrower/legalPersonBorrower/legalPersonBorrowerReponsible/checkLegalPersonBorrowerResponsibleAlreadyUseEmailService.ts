import { prisma } from '../../../../../../prisma';
import { checkCannotExists } from '../../../../utils/validator';

interface ICheckLegalPersonBorrowerResponsibleAlreadyUseEmailService {
  email: string;
  idToIgnore?: string;
}

export async function checkLegalPersonBorrowerResponsibleAlreadyUseEmailService({
  email,
  idToIgnore,
}: ICheckLegalPersonBorrowerResponsibleAlreadyUseEmailService) {
  const responsibleUser = await prisma.legalPersonBorrowerResponsible.findUnique({
    where: {
      email: email.toLowerCase(),
      NOT: idToIgnore ? { id: idToIgnore } : undefined,
    },
  });

  checkCannotExists([{ label: 'E-mail', value: responsibleUser }]);
}
