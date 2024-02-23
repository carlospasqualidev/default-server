import { prisma } from '../../../../../../prisma';
import { checkNeedExists } from '../../../../utils/validator';

interface IFindLegalPersonLenderByIdService {
  legalPersonLenderId: string;
}

export async function findLegalPersonLenderByIdService({
  legalPersonLenderId,
}: IFindLegalPersonLenderByIdService) {
  const lender = await prisma.legalPersonLender.findFirst({
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
      legalPersonLenderAddresses: {
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
      legalPersonLenderBankInfos: {
        select: {
          id: true,
          bank: true,
          agency: true,
          account: true,
          receivementKey: true,
        },
      },
      legalPersonLenderResponsibles: {
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
      id: legalPersonLenderId,
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
