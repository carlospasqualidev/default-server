import { IPrisma, prisma } from '../../../../../../prisma';

interface IUpdateLegalPersonBorrowerService {
  data: IPrisma.LegalPersonBorrowerUncheckedUpdateInput;
  legalPersonBorrowerId: string;
}

export async function updateLegalPersonBorrowerService({
  data,
  legalPersonBorrowerId,
}: IUpdateLegalPersonBorrowerService) {
  return prisma.legalPersonBorrower.update({
    data,
    where: {
      id: legalPersonBorrowerId,
    },
  });
}
