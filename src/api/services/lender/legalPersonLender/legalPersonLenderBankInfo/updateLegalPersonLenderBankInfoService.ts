import { IPrisma, prisma } from '../../../../../../prisma';

interface IUpdateLegalPersonLenderService {
  data: IPrisma.LegalPersonLenderBankInfoUncheckedUpdateInput;
  legalPersonLenderBankInfoId: string;
}

export async function updateLegalPersonLenderBankInfoService({
  data,
  legalPersonLenderBankInfoId,
}: IUpdateLegalPersonLenderService) {
  return prisma.legalPersonLenderBankInfo.update({
    data,
    where: {
      id: legalPersonLenderBankInfoId,
    },
  });
}
