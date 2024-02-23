import { prisma } from '../../../../../../prisma';
import { checkCannotExists } from '../../../../utils/validator';

interface ICheckCPFAndRGAlreadyUsedService {
  CPF?: string;
  RG?: string;
  idToIgnore?: string;
}

export async function checkNaturalPersonLenderCPFAndRGAlreadyUsedService({
  CPF,
  RG,
  idToIgnore,
}: ICheckCPFAndRGAlreadyUsedService) {
  const naturalPerson = await prisma.naturalPersonLender.findFirst({
    where: {
      OR: [{ CPF: CPF || undefined }, { RG: RG || undefined }],
      NOT: idToIgnore ? { id: idToIgnore } : undefined,
    },
  });

  checkCannotExists([{ label: 'CPF ou RG', value: naturalPerson }]);
}
