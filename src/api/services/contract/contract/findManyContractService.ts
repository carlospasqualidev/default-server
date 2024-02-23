import { prisma } from '../../../../../prisma';

interface IFindManyContractService {
  take: number;
  page: number;
  search: string;
  startAt: Date | undefined;
  endAt: Date | undefined;
}

export async function findManyContractService({
  take,
  page,
  search,
  startAt,
  endAt,
}: IFindManyContractService) {
  const [contractsData, count] = await prisma.$transaction([
    prisma.contract.findMany({
      select: {
        id: true,
        startDate: true,
        paymentStartDate: true,
        totalValue: true,
        maskedTotalValue: true,
        type: true,
        status: true,

        contractBorrower: {
          select: {
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
            clientType: true,
          },
        },

        contractLenders: {
          select: {
            clientType: true,
            legalPersonLender: {
              select: {
                name: true,
              },
            },
            naturalPersonLender: {
              select: {
                name: true,
              },
            },
          },
        },
      },

      orderBy: [
        {
          startDate: 'desc',
        },
        // {
        //   contractBorrower: {
        //     legalPersonBorrower: {
        //       name: 'asc',
        //     },
        //   },
        // },
        // {
        //   contractBorrower: {
        //     naturalPersonBorrower: {
        //       name: 'asc',
        //     },
        //   },
        // },
      ],

      take,
      skip: (page - 1) * take,
      where: {
        isDeleted: false,
        createdAt: {
          gte: startAt,
          lte: endAt,
        },
        OR: [
          {
            contractBorrower: {
              OR: [
                {
                  legalPersonBorrower: {
                    name: {
                      contains: search,
                      mode: 'insensitive',
                    },
                  },
                },
                {
                  naturalPersonBorrower: {
                    name: {
                      contains: search,
                      mode: 'insensitive',
                    },
                  },
                },
              ],
            },
          },
          {
            contractLenders: {
              some: {
                OR: [
                  {
                    legalPersonLender: {
                      name: {
                        contains: search,
                        mode: 'insensitive',
                      },
                    },
                  },
                  {
                    naturalPersonLender: {
                      name: {
                        contains: search,
                        mode: 'insensitive',
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    }),
    prisma.contract.count({
      where: {
        isDeleted: false,
        createdAt: {
          gte: startAt,
          lte: endAt,
        },
        OR: [
          {
            contractBorrower: {
              OR: [
                {
                  legalPersonBorrower: {
                    name: {
                      contains: search,
                      mode: 'insensitive',
                    },
                  },
                },
                {
                  naturalPersonBorrower: {
                    name: {
                      contains: search,
                      mode: 'insensitive',
                    },
                  },
                },
              ],
            },
          },
          {
            contractLenders: {
              some: {
                OR: [
                  {
                    legalPersonLender: {
                      name: {
                        contains: search,
                        mode: 'insensitive',
                      },
                    },
                  },
                  {
                    naturalPersonLender: {
                      name: {
                        contains: search,
                        mode: 'insensitive',
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    }),
  ]);

  return { contractsData, count };
}
