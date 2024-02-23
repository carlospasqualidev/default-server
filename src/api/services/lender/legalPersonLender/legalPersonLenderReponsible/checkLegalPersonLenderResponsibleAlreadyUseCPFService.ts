import { prisma } from '../../../../../../prisma';
import { checkCannotExists } from '../../../../utils/validator';

interface ICheckLegalPersonLenderResponsibleAlreadyUseCPFService {
  CPF: string;
  idToIgnore?: string;
}

export async function checkLegalPersonLenderResponsibleAlreadyUseCPFService({
  CPF,
  idToIgnore,
}: ICheckLegalPersonLenderResponsibleAlreadyUseCPFService) {
  const responsibleUser = await prisma.legalPersonLenderResponsible.findUnique({
    where: {
      CPF,
      NOT: idToIgnore ? { id: idToIgnore } : undefined,
    },
  });

  checkCannotExists([{ label: 'CPF', value: responsibleUser }]);
}
