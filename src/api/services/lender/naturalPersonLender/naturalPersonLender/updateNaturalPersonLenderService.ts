import { IPrisma, prisma } from '../../../../../../prisma';

interface IUpdateNaturalPersonLenderService {
  data: IPrisma.NaturalPersonLenderUncheckedUpdateInput;
  naturalPersonLenderId: string;
}

export async function updateNaturalPersonLenderService({
  data,
  naturalPersonLenderId,
}: IUpdateNaturalPersonLenderService) {
  return prisma.naturalPersonLender.update({
    data,
    where: {
      id: naturalPersonLenderId,
    },
  });
}
