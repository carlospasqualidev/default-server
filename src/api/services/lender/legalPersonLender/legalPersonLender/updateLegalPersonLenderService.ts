import { IPrisma, prisma } from '../../../../../../prisma';

interface IUpdateLegalPersonLenderService {
  data: IPrisma.LegalPersonLenderUncheckedUpdateInput;
  legalPersonLenderId: string;
}

export async function updateLegalPersonLenderService({
  data,
  legalPersonLenderId,
}: IUpdateLegalPersonLenderService) {
  return prisma.legalPersonLender.update({
    data,
    where: {
      id: legalPersonLenderId,
    },
  });
}
