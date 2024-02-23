import { prisma } from '../../../../../../prisma';
import { checkCannotExists } from '../../../../utils/validator';

interface ICheckCNPJAlreadyUsedService {
  CNPJ: string;
  idToIgnore?: string;
}

export async function checkLegalPersonBorrowerCNPJAlreadyUsedService({
  CNPJ,
  idToIgnore,
}: ICheckCNPJAlreadyUsedService) {
  const legalPerson = await prisma.legalPersonBorrower.findFirst({
    where: {
      CNPJ,
      NOT: idToIgnore ? { id: idToIgnore } : undefined,
    },
  });

  checkCannotExists([{ label: 'CNPJ', value: legalPerson }]);
}
