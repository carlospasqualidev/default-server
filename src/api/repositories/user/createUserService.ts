import { Prisma, prisma } from '../../../../prisma';

export async function createUserService(data: Prisma.usersUncheckedCreateInput) {
  await prisma.users.create({
    data,
  });
}
