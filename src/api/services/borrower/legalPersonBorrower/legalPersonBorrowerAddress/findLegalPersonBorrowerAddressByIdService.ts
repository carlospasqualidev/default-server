import { prisma } from '../../../../../../prisma';
import { checkNeedExists } from '../../../../utils/validator';

interface IFindLegalPersonBorrowerByIdService {
  legalPersonBorrowerAddressId: string;
}

export async function findLegalPersonBorrowerAddressByIdService({
  legalPersonBorrowerAddressId,
}: IFindLegalPersonBorrowerByIdService) {
  const BorrowerAddress = await prisma.legalPersonBorrowerAddress.findFirst({
    where: {
      id: legalPersonBorrowerAddressId,
    },
  });

  checkNeedExists([
    {
      label: 'Endereço do devedor',
      value: BorrowerAddress,
    },
  ]);

  return BorrowerAddress!;
}
