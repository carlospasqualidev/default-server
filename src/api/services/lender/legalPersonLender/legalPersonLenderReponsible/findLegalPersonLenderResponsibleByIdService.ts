import { prisma } from '../../../../../../prisma';
import { checkNeedExists } from '../../../../utils/validator';

interface IFindLegalPersonLenderResponsibleByIdService {
  legalPersonLenderResponsibleId: string;
}

export async function findLegalPersonLenderResponsibleByIdService({
  legalPersonLenderResponsibleId,
}: IFindLegalPersonLenderResponsibleByIdService) {
  const responsible = await prisma.legalPersonLenderResponsible.findFirst({
    where: {
      id: legalPersonLenderResponsibleId,
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
