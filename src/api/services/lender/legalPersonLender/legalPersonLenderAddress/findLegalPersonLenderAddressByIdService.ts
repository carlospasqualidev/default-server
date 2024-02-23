import { prisma } from '../../../../../../prisma';
import { checkNeedExists } from '../../../../utils/validator';

interface IFindLegalPersonLenderByIdService {
  legalPersonLenderAddressId: string;
}

export async function findLegalPersonLenderAddressByIdService({
  legalPersonLenderAddressId,
}: IFindLegalPersonLenderByIdService) {
  const lenderAddress = await prisma.legalPersonLenderAddress.findFirst({
    where: {
      id: legalPersonLenderAddressId,
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
