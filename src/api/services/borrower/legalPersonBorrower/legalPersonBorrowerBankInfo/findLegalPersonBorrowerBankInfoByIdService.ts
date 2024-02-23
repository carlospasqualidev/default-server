import { prisma } from '../../../../../../prisma';
import { checkNeedExists } from '../../../../utils/validator';

interface IFindLegalPersonBorrowerBankInfoByIdService {
  legalPersonBorrowerBankInfoId: string;
}

export async function findLegalPersonBorrowerBankInfoByIdService({
  legalPersonBorrowerBankInfoId,
}: IFindLegalPersonBorrowerBankInfoByIdService) {
  const borrowerBankInfo = await prisma.legalPersonBorrowerBankInfo.findFirst({
    where: {
      id: legalPersonBorrowerBankInfoId,
    },
  });

  checkNeedExists([
    {
      label: 'Informações bancárias do devedor',
      value: borrowerBankInfo,
    },
  ]);

  return borrowerBankInfo!;
}
