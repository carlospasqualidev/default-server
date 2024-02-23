import { IPrisma, prisma } from '../../../../../../prisma';

interface IUpdateLegalPersonLenderResponsibleService {
  data: IPrisma.LegalPersonLenderResponsibleUncheckedUpdateInput;
  legalPersonLenderResponsibleId: string;
}

export async function updateLegalPersonLenderResponsibleService({
  data,
  legalPersonLenderResponsibleId,
}: IUpdateLegalPersonLenderResponsibleService) {
  return prisma.legalPersonLenderResponsible.update({
    data,
    where: {
      id: legalPersonLenderResponsibleId,
    },
  });
}
