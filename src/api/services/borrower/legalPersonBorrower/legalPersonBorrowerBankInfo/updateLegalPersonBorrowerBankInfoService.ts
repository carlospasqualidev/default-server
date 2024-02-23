import { IPrisma, prisma } from '../../../../../../prisma';

interface IUpdateLegalPersonBorrowerBankInfoService {
  data: IPrisma.LegalPersonBorrowerBankInfoUncheckedUpdateInput;
  legalPersonBorrowerBankInfoId: string;
}

export async function updateLegalPersonBorrowerBankInfoService({
  data,
  legalPersonBorrowerBankInfoId,
}: IUpdateLegalPersonBorrowerBankInfoService) {
  return prisma.legalPersonBorrowerBankInfo.update({
    data,
    where: {
      id: legalPersonBorrowerBankInfoId,
    },
  });
}
