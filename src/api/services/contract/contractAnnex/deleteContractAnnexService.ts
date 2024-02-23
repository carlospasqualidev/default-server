import { prisma } from '../../../../../prisma';
import { findContractAnnexByIdService } from './findContractAnnexByIdService';

export async function deleteContractAnnexService({ contractAnnexId }: { contractAnnexId: string }) {
  await findContractAnnexByIdService({ contractAnnexId });

  return prisma.contractAnnex.delete({
    where: {
      id: contractAnnexId,
    },
  });
}
