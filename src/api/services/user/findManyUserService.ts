import { IPrisma, prisma } from '../../../../prisma';

interface IFindManyUserService {
  take: number;
  page: number;
  filter: string;
}

export async function findManyUserService({ page, take, filter }: IFindManyUserService) {
  const where: IPrisma.UserWhereInput = {
    name: {
      contains: filter,
      mode: 'insensitive',
    },
  };

  const [usersData, count] = await prisma.$transaction([
    prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        isBlocked: true,
        accesses: {
          select: {
            createdAt: true,
          },
          take: 1,
          orderBy: {
            createdAt: 'desc',
          },
        },

        userPermissions: {
          select: {
            permission: true,
          },
        },
      },
      take,
      skip: (page - 1) * take,
      orderBy: {
        name: 'asc',
      },
      where,
    }),

    prisma.user.count({
      where,
    }),
  ]);

  const users = usersData.map((user) => {
    const lastAccess = user.accesses?.[0]?.createdAt || null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      isBlocked: user.isBlocked,
      lastAccess,
    };
  });

  return { users, count };
}
