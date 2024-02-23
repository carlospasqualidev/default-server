import { prisma } from '../../../../../../prisma';
import { checkCannotExists } from '../../../../utils/validator';

interface ICheckLegalPersonLenderResponsibleAlreadyUseEmailService {
  email: string;
  idToIgnore?: string;
}

export async function checkLegalPersonLenderResponsibleAlreadyUseEmailService({
  email,
  idToIgnore,
}: ICheckLegalPersonLenderResponsibleAlreadyUseEmailService) {
  const responsibleUser = await prisma.legalPersonLenderResponsible.findUnique({
    where: {
      email: email.toLowerCase(),
      NOT: idToIgnore ? { id: idToIgnore } : undefined,
    },
  });

  checkCannotExists([{ label: 'E-mail', value: responsibleUser }]);
}
