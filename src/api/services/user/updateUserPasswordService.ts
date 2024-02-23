import { prisma } from '../../../../prisma';

interface IUpdateUserPassword {
  userId: string;
  password: string;
}

export async function updateUserPasswordService({ userId, password }: IUpdateUserPassword) {
  return prisma.user.update({
    data: {
      password,
    },
    where: {
      id: userId,
    },
  });
}
