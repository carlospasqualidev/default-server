import { prisma } from '../../../../../../prisma';
import { checkCannotExists } from '../../../../utils/validator';

interface ICheckLegalPersonBorrowerResponsibleAlreadyUseCPFService {
  CPF: string;
  idToIgnore?: string;
}

export async function checkLegalPersonBorrowerResponsibleAlreadyUseCPFService({
  CPF,
  idToIgnore,
}: ICheckLegalPersonBorrowerResponsibleAlreadyUseCPFService) {
  const responsibleUser = await prisma.legalPersonBorrowerResponsible.findUnique({
    where: {
      CPF,
      NOT: idToIgnore ? { id: idToIgnore } : undefined,
    },
  });

  checkCannotExists([{ label: 'CPF', value: responsibleUser }]);
}
