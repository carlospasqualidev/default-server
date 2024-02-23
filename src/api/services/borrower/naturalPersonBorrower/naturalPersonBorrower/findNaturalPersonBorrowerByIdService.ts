import { prisma } from '../../../../../../prisma';
import { checkNeedExists } from '../../../../utils/validator';

interface IFindNaturalPersonBorrowerByIdService {
  naturalPersonBorrowerId: string;
}

export async function findNaturalPersonBorrowerByIdService({
  naturalPersonBorrowerId,
}: IFindNaturalPersonBorrowerByIdService) {
  const Borrower = await prisma.naturalPersonBorrower.findFirst({
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
      naturalPersonBorrowerAddresses: {
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
      naturalPersonBorrowerBankInfos: {
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
      id: naturalPersonBorrowerId,
    },
  });

  checkNeedExists([
    {
      label: 'devedor',
      value: Borrower,
    },
  ]);

  return Borrower!;
}
