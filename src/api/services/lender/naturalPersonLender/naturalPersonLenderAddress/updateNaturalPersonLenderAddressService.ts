import { IPrisma, prisma } from '../../../../../../prisma';

interface IUpdateNaturalPersonLenderAddressService {
  data: IPrisma.NaturalPersonLenderAddressUncheckedUpdateInput;
  naturalPersonLenderAddressId: string;
}

export async function updateNaturalPersonLenderAddressService({
  data,
  naturalPersonLenderAddressId,
}: IUpdateNaturalPersonLenderAddressService) {
  return prisma.naturalPersonLenderAddress.update({
    data,
    where: {
      id: naturalPersonLenderAddressId,
    },
  });
}
