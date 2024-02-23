import { prisma } from '../../../../../prisma';
import { checkNeedExists } from '../../../utils/validator';

interface IFindContractAnnexByIdService {
  contractAnnexId: string;
}

export async function findContractAnnexByIdService({
  contractAnnexId,
}: IFindContractAnnexByIdService) {
  const contract = await prisma.contractAnnex.findFirst({
    where: {
      id: contractAnnexId,
    },
  });

  checkNeedExists([
    {
      label: 'anexo do contrato',
      value: contract,
    },
  ]);

  return contract!;
}
