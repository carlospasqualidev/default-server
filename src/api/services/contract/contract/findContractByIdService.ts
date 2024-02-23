import { prisma } from '../../../../../prisma';
import { checkNeedExists } from '../../../utils/validator';

interface IFindContractByIdService {
  contractId: string;
}

export async function findContractByIdService({ contractId }: IFindContractByIdService) {
  const borrower = await prisma.contract.findFirst({
    select: {
      id: true,
      startDate: true,
      paymentStartDate: true,
      totalValue: true,
      maskedTotalValue: true,
      administrativeFee: true,
      type: true,
      fee: true,
      paymentTermMonths: true,
      gracePeriodPaymentMonths: true,
      selic: true,
      spread: true,
      isDeleted: true,
      contractBorrower: {
        select: {
          clientType: true,
          legalPersonBorrower: {
            select: {
              id: true,
              CNPJ: true,
              name: true,
              email: true,
              contactPhone: true,
            },
          },
          naturalPersonBorrower: {
            select: {
              id: true,
              CPF: true,
              name: true,
              email: true,
              contactPhone: true,
            },
          },
        },
      },
      contractLenders: {
        select: {
          clientType: true,
          maskedValue: true,
          value: true,
          legalPersonLender: {
            select: {
              id: true,
              name: true,
              email: true,
              CNPJ: true,
            },
          },
          naturalPersonLender: {
            select: {
              id: true,
              name: true,
              email: true,
              CPF: true,
            },
          },
        },
      },
      contractAnexes: true,
    },
    where: {
      id: contractId,
    },
  });

  checkNeedExists([
    {
      label: 'contrato',
      value: borrower,
    },
  ]);

  return borrower!;
}
