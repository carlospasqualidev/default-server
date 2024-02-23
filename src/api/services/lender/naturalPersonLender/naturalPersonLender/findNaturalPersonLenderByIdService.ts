import { prisma } from '../../../../../../prisma';
import { checkNeedExists } from '../../../../utils/validator';

interface IFindNaturalPersonLenderByIdService {
  naturalPersonLenderId: string;
}

export async function findNaturalPersonLenderByIdService({
  naturalPersonLenderId,
}: IFindNaturalPersonLenderByIdService) {
  const lender = await prisma.naturalPersonLender.findFirst({
    select: {
      id: true,
      name: true,
      email: true,
      RG: true,
      CPF: true,
      contactPhone: true,
      birthdate: true,
      createdAt: true,
      updatedAt: true,
      isDeleted: true,
      naturalPersonLenderAddresses: {
        select: {
          id: true,
          street: true,
          number: true,
          complement: true,
          neighborhood: true,
          city: true,
          state: true,
          zipCode: true,
        },
      },
      naturalPersonLenderBankInfos: {
        select: {
          id: true,
          bank: true,
          agency: true,
          account: true,
          receivementKey: true,
        },
      },
    },
    where: {
      id: naturalPersonLenderId,
    },
  });

  checkNeedExists([
    {
      label: 'credor',
      value: lender,
    },
  ]);

  return lender!;
}
