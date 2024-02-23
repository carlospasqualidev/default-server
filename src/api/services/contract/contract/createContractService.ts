import { IPrisma, prisma } from '../../../../../prisma';

export async function createContractService(data: IPrisma.ContractCreateArgs) {
  return prisma.contract.create(data);
}
