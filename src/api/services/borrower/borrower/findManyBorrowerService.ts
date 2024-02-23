import { prisma } from '../../../../../prisma';

interface IFindManyBorrowerService {
  take: number;
  page: number;
  filter: string;
}

export async function findManyBorrowerService({ take, page, filter }: IFindManyBorrowerService) {
  const [legalPersonBorrowers, naturalPersonBorrowers] = await prisma.$transaction([
    prisma.legalPersonBorrower.findMany({
      orderBy: {
        name: 'asc',
      },
      take,
      skip: (page - 1) * take,
      where: {
        isDeleted: false,
        OR: [
          {
            CNPJ: {
              contains: filter,
              mode: 'insensitive',
            },
          },
          {
            name: {
              contains: filter,
              mode: 'insensitive',
            },
          },
        ],
      },
    }),
    prisma.naturalPersonBorrower.findMany({
      orderBy: {
        name: 'asc',
      },
      take,
      skip: (page - 1) * take,

      where: {
        isDeleted: false,
        OR: [
          {
            CPF: {
              contains: filter,
              mode: 'insensitive',
            },
          },
          {
            name: {
              contains: filter,
              mode: 'insensitive',
            },
          },
        ],
      },
    }),
  ]);

  const borrowers = [];

  for (let i = 0; i < legalPersonBorrowers.length; i++) {
    borrowers.push({
      id: legalPersonBorrowers[i].id,
      name: legalPersonBorrowers[i].name,
      document: legalPersonBorrowers[i].CNPJ,
      email: legalPersonBorrowers[i].email,
      createdAt: legalPersonBorrowers[i].createdAt,
      type: 'legalPerson',
    });
  }

  for (let i = 0; i < naturalPersonBorrowers.length; i++) {
    borrowers.push({
      id: naturalPersonBorrowers[i].id,
      name: naturalPersonBorrowers[i].name,
      document: naturalPersonBorrowers[i].CPF,
      email: naturalPersonBorrowers[i].email,
      createdAt: naturalPersonBorrowers[i].createdAt,
      type: 'naturalPerson',
    });
  }

  borrowers.sort((a, b) => a.name.localeCompare(b.name));

  return { borrowers, count: borrowers.length };
}
