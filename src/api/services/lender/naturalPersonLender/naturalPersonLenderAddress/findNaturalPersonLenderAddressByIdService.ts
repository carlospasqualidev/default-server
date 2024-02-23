import { prisma } from '../../../../../../prisma';
import { checkNeedExists } from '../../../../utils/validator';

interface IFindNaturalPersonLenderByIdService {
  naturalPersonLenderAddressId: string;
}

export async function findNaturalPersonLenderAddressByIdService({
  naturalPersonLenderAddressId,
}: IFindNaturalPersonLenderByIdService) {
  const lenderAddress = await prisma.naturalPersonLenderAddress.findFirst({
    where: {
      id: naturalPersonLenderAddressId,
    },
  });

  checkNeedExists([
    {
      label: 'Endereço do cliente',
      value: lenderAddress,
    },
  ]);

  return lenderAddress!;
}
