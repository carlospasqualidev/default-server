import { Prisma } from '../../../../../prisma';
import { checkExists } from '../../server/validator';
import { IFindUserByEmail } from './types';

export async function findUserByEmailService({ email }: IFindUserByEmail) {
  const User = await Prisma.user.findUnique({
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      image: true,
      lastAccess: true,
      isBlocked: true,
      isDeleted: true,
      customUrl: true,
      Permissions: {
        select: {
          Permission: {
            select: {
              id: true,
              name: true,
            },
          },
          create: true,
          edit: true,
          view: true,
          delete: true,
        },
      },
    },
    where: {
      email,
    },
  });

  checkExists([{ label: 'Usuário', variable: User }]);

  return User!;
}
