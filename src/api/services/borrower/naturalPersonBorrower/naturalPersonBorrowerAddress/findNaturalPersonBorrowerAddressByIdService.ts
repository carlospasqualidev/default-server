import { prisma } from '../../../../../../prisma';
import { checkNeedExists } from '../../../../utils/validator';

interface IFindNaturalPersonBorrowerByIdService {
  naturalPersonBorrowerAddressId: string;
}

export async function findNaturalPersonBorrowerAddressByIdService({
  naturalPersonBorrowerAddressId,
}: IFindNaturalPersonBorrowerByIdService) {
  const BorrowerAddress = await prisma.naturalPersonBorrowerAddress.findFirst({
    where: {
      id: naturalPersonBorrowerAddressId,
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
