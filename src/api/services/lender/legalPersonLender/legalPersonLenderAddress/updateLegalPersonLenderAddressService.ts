import { IPrisma, prisma } from '../../../../../../prisma';

interface IUpdateLegalPersonLenderAddressService {
  data: IPrisma.LegalPersonLenderAddressUncheckedUpdateInput;
  legalPersonLenderAddressId: string;
}

export async function updateLegalPersonLenderAddressService({
  data,
  legalPersonLenderAddressId,
}: IUpdateLegalPersonLenderAddressService) {
  return prisma.legalPersonLenderAddress.update({
    data,
    where: {
      id: legalPersonLenderAddressId,
    },
  });
}
