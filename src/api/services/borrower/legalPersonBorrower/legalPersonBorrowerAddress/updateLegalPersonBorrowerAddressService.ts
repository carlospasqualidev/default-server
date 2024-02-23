import { IPrisma, prisma } from '../../../../../../prisma';

interface IUpdateLegalPersonBorrowerAddressService {
  data: IPrisma.LegalPersonBorrowerAddressUncheckedUpdateInput;
  legalPersonBorrowerAddressId: string;
}

export async function updateLegalPersonBorrowerAddressService({
  data,
  legalPersonBorrowerAddressId,
}: IUpdateLegalPersonBorrowerAddressService) {
  return prisma.legalPersonBorrowerAddress.update({
    data,
    where: {
      id: legalPersonBorrowerAddressId,
    },
  });
}
