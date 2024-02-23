import { prisma } from '../../../../../../prisma';
import { checkNeedExists } from '../../../../utils/validator';

interface IFindNaturalPersonBorrowerBankInfoByIdService {
  naturalPersonBorrowerBankInfoId: string;
}

export async function findNaturalPersonBorrowerBankInfoByIdService({
  naturalPersonBorrowerBankInfoId,
}: IFindNaturalPersonBorrowerBankInfoByIdService) {
  const BorrowerBankInfo = await prisma.naturalPersonBorrowerBankInfo.findFirst({
    where: {
      id: naturalPersonBorrowerBankInfoId,
    },
  });

  checkNeedExists([
    {
      label: 'Informações bancárias do devedor',
      value: BorrowerBankInfo,
    },
  ]);

  return BorrowerBankInfo!;
}
