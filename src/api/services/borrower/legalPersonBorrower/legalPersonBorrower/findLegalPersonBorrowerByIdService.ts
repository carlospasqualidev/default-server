import { prisma } from '../../../../../../prisma';
import { checkNeedExists } from '../../../../utils/validator';

interface IFindLegalPersonBorrowerByIdService {
  legalPersonBorrowerId: string;
}

export async function findLegalPersonBorrowerByIdService({
  legalPersonBorrowerId,
}: IFindLegalPersonBorrowerByIdService) {
  const borrower = await prisma.legalPersonBorrower.findFirst({
    select: {
      id: true,
      name: true,
      email: true,
      contactPhone: true,
      CNPJ: true,
      fantasyName: true,
      municipalRegistration: true,
      foundationDate: true,
      stateRegistration: true,
      createdAt: true,
      updatedAt: true,
      isDeleted: true,
      legalPersonBorrowerAddresses: {
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
      legalPersonBorrowerBankInfos: {
        select: {
          id: true,
          bank: true,
          agency: true,
          account: true,
          receivementKey: true,
        },
      },
      legalPersonBorrowerResponsibles: {
        select: {
          id: true,
          CPF: true,
          email: true,
          name: true,
          contactPhone: true,
        },
      },
    },
    where: {
      id: legalPersonBorrowerId,
    },
  });

  checkNeedExists([
    {
      label: 'devedor',
      value: borrower,
    },
  ]);

  return borrower!;
}
