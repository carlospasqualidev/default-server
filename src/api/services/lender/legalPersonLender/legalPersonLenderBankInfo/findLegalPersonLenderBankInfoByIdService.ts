import { prisma } from '../../../../../../prisma';
import { checkNeedExists } from '../../../../utils/validator';

interface IFindLegalPersonLenderBankInfoByIdService {
  legalPersonLenderBankInfoId: string;
}

export async function findLegalPersonLenderBankInfoByIdService({
  legalPersonLenderBankInfoId,
}: IFindLegalPersonLenderBankInfoByIdService) {
  const lenderBankInfo = await prisma.legalPersonLenderBankInfo.findFirst({
    where: {
      id: legalPersonLenderBankInfoId,
    },
  });

  checkNeedExists([
    {
      label: 'Informações bancárias do cliente',
      value: lenderBankInfo,
    },
  ]);

  return lenderBankInfo!;
}
