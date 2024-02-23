import { IPrisma, prisma } from '../../../../../../prisma';

interface IUpdateNaturalPersonLenderBankInfoService {
  data: IPrisma.NaturalPersonLenderBankInfoUncheckedUpdateInput;
  naturalPersonLenderBankInfoId: string;
}

export async function updateNaturalPersonLenderBankInfoService({
  data,
  naturalPersonLenderBankInfoId,
}: IUpdateNaturalPersonLenderBankInfoService) {
  return prisma.naturalPersonLenderBankInfo.update({
    data,
    where: {
      id: naturalPersonLenderBankInfoId,
    },
  });
}
