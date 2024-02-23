import { IPrisma, prisma } from '../../../../../prisma';

export async function createManyContractInstallmentService(
  data: IPrisma.ContractInstallmentCreateManyArgs,
) {
  return prisma.contractInstallment.createMany(data);
}
