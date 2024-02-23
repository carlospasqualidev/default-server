import { prisma } from '../../../../../prisma';

interface IFindManyLenderService {
  take: number;
  page: number;
  filter: string;
}

export async function findManyLenderService({ take, page, filter }: IFindManyLenderService) {
  const [legalPersonLenders, naturalPersonLenders] = await prisma.$transaction([
    prisma.legalPersonLender.findMany({
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
    prisma.naturalPersonLender.findMany({
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

  const lenders = [];

  for (let i = 0; i < legalPersonLenders.length; i++) {
    lenders.push({
      id: legalPersonLenders[i].id,
      name: legalPersonLenders[i].name,
      document: legalPersonLenders[i].CNPJ,
      email: legalPersonLenders[i].email,
      createdAt: legalPersonLenders[i].createdAt,
      type: 'legalPerson',
    });
  }

  for (let i = 0; i < naturalPersonLenders.length; i++) {
    lenders.push({
      id: naturalPersonLenders[i].id,
      name: naturalPersonLenders[i].name,
      document: naturalPersonLenders[i].CPF,
      email: naturalPersonLenders[i].email,
      createdAt: naturalPersonLenders[i].createdAt,
      type: 'naturalPerson',
    });
  }

  lenders.sort((a, b) => a.name.localeCompare(b.name));

  return { lenders, count: lenders.length };
}
