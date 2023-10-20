import { prisma } from '../../../../prisma';

interface IFindManyUsersServices {
  page: number;
  take: number;
  search: string;
}

export async function findManyUsersServices({ page, take, search }: IFindManyUsersServices) {
  return prisma.users.findMany({
    include: { person: true },

    take,
    skip: (page - 1) * take,

    orderBy: {
      person: {
        name: 'asc',
      },
    },

    where: {
      person: {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
    },
  });
}
