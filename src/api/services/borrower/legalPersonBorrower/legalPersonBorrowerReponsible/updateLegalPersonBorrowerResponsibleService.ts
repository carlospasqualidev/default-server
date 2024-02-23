import { IPrisma, prisma } from '../../../../../../prisma';

interface IUpdateLegalPersonBorrowerResponsibleService {
  data: IPrisma.LegalPersonBorrowerResponsibleUncheckedUpdateInput;
  legalPersonBorrowerResponsibleId: string;
}

export async function updateLegalPersonBorrowerResponsibleService({
  data,
  legalPersonBorrowerResponsibleId,
}: IUpdateLegalPersonBorrowerResponsibleService) {
  return prisma.legalPersonBorrowerResponsible.update({
    data,
    where: {
      id: legalPersonBorrowerResponsibleId,
    },
  });
}
