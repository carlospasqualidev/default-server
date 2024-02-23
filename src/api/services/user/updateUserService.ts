import { IPrisma, prisma } from '../../../../prisma';

interface IUpdateUserService {
  data: IPrisma.UserUncheckedUpdateInput;
  userId: string;
}

export async function updateUserService({ data, userId }: IUpdateUserService) {
  return prisma.user.update({
    data,
    where: {
      id: userId,
    },
  });
}
