import { IPrisma, prisma } from '../../../../../prisma';

interface IUpdateContractService {
  data: IPrisma.ContractUpdateInput;
  contractId: string;
}

export async function updateContractService({ data, contractId }: IUpdateContractService) {
  const [, , contract] = await prisma.$transaction([
    prisma.contractBorrower.delete({
      where: {
        contractId,
      },
    }),

    prisma.contractLender.deleteMany({
      where: {
        contractId,
      },
    }),

    prisma.contract.update({
      data,
      where: {
        id: contractId,
      },
    }),
  ]);

  return contract;
}
