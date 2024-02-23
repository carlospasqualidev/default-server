import { IPrisma, prisma } from '../../../../../../prisma';

interface IUpdateNaturalPersonBorrowerAddressService {
  data: IPrisma.NaturalPersonBorrowerAddressUncheckedUpdateInput;
  naturalPersonBorrowerAddressId: string;
}

export async function updateNaturalPersonBorrowerAddressService({
  data,
  naturalPersonBorrowerAddressId,
}: IUpdateNaturalPersonBorrowerAddressService) {
  return prisma.naturalPersonBorrowerAddress.update({
    data,
    where: {
      id: naturalPersonBorrowerAddressId,
    },
  });
}
