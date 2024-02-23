import { prisma } from '../../../../../prisma';

interface IUpdateContractService {
  contractId: string;
}

export async function fakeDeleteContractService({ contractId }: IUpdateContractService) {
  await prisma.contract.update({
    data: {
      isDeleted: true,
    },
    where: {
      id: contractId,
    },
  });
}
