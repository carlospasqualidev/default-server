import { IPrisma, prisma } from '../../../../../prisma';

export async function createContractAnnexService(data: IPrisma.ContractAnnexCreateManyArgs) {
  return prisma.contractAnnex.createMany(data);
}
