import { IPrisma, prisma } from '../../../../../../prisma';

interface IUpdateNaturalPersonBorrowerService {
  data: IPrisma.NaturalPersonBorrowerUncheckedUpdateInput;
  naturalPersonBorrowerId: string;
}

export async function updateNaturalPersonBorrowerService({
  data,
  naturalPersonBorrowerId,
}: IUpdateNaturalPersonBorrowerService) {
  return prisma.naturalPersonBorrower.update({
    data,
    where: {
      id: naturalPersonBorrowerId,
    },
  });
}
