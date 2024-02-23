import { prisma } from '../../../../../../prisma';
import { checkNeedExists } from '../../../../utils/validator';

interface IFindNaturalPersonLenderBankInfoByIdService {
  naturalPersonLenderBankInfoId: string;
}

export async function findNaturalPersonLenderBankInfoByIdService({
  naturalPersonLenderBankInfoId,
}: IFindNaturalPersonLenderBankInfoByIdService) {
  const lenderBankInfo = await prisma.naturalPersonLenderBankInfo.findFirst({
    where: {
      id: naturalPersonLenderBankInfoId,
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
