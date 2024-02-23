import { IPrisma, enums, prisma } from '../../../../../prisma';

interface IFindManyContractInstallmentService {
  take: number;
  page: number;
  startAt: Date | undefined;
  endAt: Date | undefined;
  status: enums.ContractInstallmentStatus[];
  borrowers: string[];
  lenders: string[];
}

export async function findManyContractInstallmentService({
  take,
  page,
  startAt,
  endAt,
  status,
  borrowers,
  lenders,
}: IFindManyContractInstallmentService) {
  const where: IPrisma.ContractInstallmentWhereInput = {
    contract: {
      isDeleted: false,

      contractBorrower:
        borrowers && borrowers.length > 0
          ? {
              OR: [
                {
                  legalPersonBorrower: {
                    name: {
                      in: borrowers,
                    },
                  },
                },
                {
                  naturalPersonBorrower: {
                    name: {
                      in: borrowers,
                    },
                  },
                },
              ],
            }
          : undefined,

      contractLenders:
        lenders && lenders.length > 0
          ? {
              some: {
                OR: [
                  {
                    legalPersonLender: {
                      name: {
                        in: lenders,
                      },
                    },
                  },
                  {
                    naturalPersonLender: {
                      name: {
                        in: lenders,
                      },
                    },
                  },
                ],
              },
            }
          : undefined,
    },
    status:
      status && status.length > 0
        ? {
            in: status,
          }
        : undefined,
    dueDate: {
      gte: startAt,
      lte: endAt,
    },
  };

  const [installments, count] = await prisma.$transaction([
    prisma.contractInstallment.findMany({
      select: {
        id: true,
        dueDate: true,
        paidDate: true,
        maskedTotalValue: true,
        status: true,
        contract: {
          select: {
            id: true,
            contractBorrower: {
              select: {
                clientType: true,
                legalPersonBorrower: {
                  select: {
                    name: true,
                  },
                },
                naturalPersonBorrower: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },

      orderBy: [
        {
          dueDate: 'asc',
        },
      ],

      take,
      skip: (page - 1) * take,
      where,
    }),

    prisma.contractInstallment.count({
      where,
    }),
  ]);

  return { installments, count };
}
