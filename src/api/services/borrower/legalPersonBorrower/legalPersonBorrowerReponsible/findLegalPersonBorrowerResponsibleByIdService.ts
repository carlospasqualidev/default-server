import { prisma } from '../../../../../../prisma';
import { checkNeedExists } from '../../../../utils/validator';

interface IFindLegalPersonBorrowerResponsibleByIdService {
  legalPersonBorrowerResponsibleId: string;
}

export async function findLegalPersonBorrowerResponsibleByIdService({
  legalPersonBorrowerResponsibleId,
}: IFindLegalPersonBorrowerResponsibleByIdService) {
  const responsible = await prisma.legalPersonBorrowerResponsible.findFirst({
    where: {
      id: legalPersonBorrowerResponsibleId,
    },
  });

  checkNeedExists([
    {
      label: 'Responsável',
      value: responsible,
    },
  ]);

  return responsible!;
}
