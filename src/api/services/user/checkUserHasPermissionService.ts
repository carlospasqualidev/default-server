import { prisma } from '../../../../prisma';
import { TPermissions } from '../../../types/permissions';
import { ErrorMessage } from '../../utils/error';

interface ICheckOrganizationUserHasPermission {
  userId: string;
  permission: TPermissions;
}

export async function checkUserHasPermissionService({
  userId,
  permission,
}: ICheckOrganizationUserHasPermission) {
  const user = await prisma.user.findFirst({
    select: {
      userPermissions: {
        select: {
          user: true,
          permission: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    where: {
      id: userId,
      userPermissions: {
        some: {
          userId,
          permission: {
            name: permission,
          },
        },
      },
    },
  });

  if (!user) {
    throw new ErrorMessage({
      statusCode: '403 FORBIDDEN',
      message: 'Você não tem permissão para executar esta ação.',
    });
  }
}
