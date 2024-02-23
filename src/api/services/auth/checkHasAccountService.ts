import { prisma } from '../../../../prisma';

interface ICheckEmailAlredyRegistered {
  email: string;
}

export async function checkHasAccountService({ email }: ICheckEmailAlredyRegistered) {
  const user = await prisma.user.findUnique({
    select: {
      id: true,
      name: true,
      email: true,
    },
    where: {
      email,
    },
  });

  return user;
}
