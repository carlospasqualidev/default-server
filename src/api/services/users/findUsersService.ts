import { prisma, IPrisma } from '../../../../prisma';
import { checkExists } from '../../utils/validator';

// #region Interfaces
interface IFindUsersService {
  where: IPrisma.usersWhereInput | undefined;
}
// endregion

export async function findUsersService({ where }: IFindUsersService) {
  const user = await prisma.users.findFirst({
    include: {
      person: {
        include: {
          gender: true,
          address: true,
          companies: {
            include: {
              personCompanyPermissions: {
                include: {
                  permissionSublevels: {
                    include: {
                      permissions: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      permissions: {
        include: {
          permission: true,
        },
      },
    },

    where,
  });
  checkExists([{ label: 'Usuário', value: user }]);

  return user!;
}
