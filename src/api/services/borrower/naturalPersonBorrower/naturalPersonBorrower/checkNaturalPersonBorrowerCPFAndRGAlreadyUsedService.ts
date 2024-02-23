import { prisma } from '../../../../../../prisma';
import { checkCannotExists } from '../../../../utils/validator';

interface ICheckCPFAndRGAlreadyUsedService {
  CPF?: string;
  RG?: string;
  idToIgnore?: string;
}

export async function checkNaturalPersonBorrowerCPFAndRGAlreadyUsedService({
  CPF,
  RG,
  idToIgnore,
}: ICheckCPFAndRGAlreadyUsedService) {
  const naturalPerson = await prisma.naturalPersonBorrower.findFirst({
    where: {
      OR: [{ CPF: CPF || undefined }, { RG: RG || undefined }],
      NOT: idToIgnore ? { id: idToIgnore } : undefined,
    },
  });

  checkCannotExists([{ label: 'CPF ou RG', value: naturalPerson }]);
}
