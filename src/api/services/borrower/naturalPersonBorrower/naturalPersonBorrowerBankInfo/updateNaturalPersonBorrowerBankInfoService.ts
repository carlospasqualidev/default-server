import { IPrisma, prisma } from '../../../../../../prisma';

interface IUpdateNaturalPersonBorrowerBankInfoService {
  data: IPrisma.NaturalPersonBorrowerBankInfoUncheckedUpdateInput;
  naturalPersonBorrowerBankInfoId: string;
}

export async function updateNaturalPersonBorrowerBankInfoService({
  data,
  naturalPersonBorrowerBankInfoId,
}: IUpdateNaturalPersonBorrowerBankInfoService) {
  return prisma.naturalPersonBorrowerBankInfo.update({
    data,
    where: {
      id: naturalPersonBorrowerBankInfoId,
    },
  });
}
