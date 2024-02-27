import { prisma, enums } from '../../../../prisma';
import { ErrorMessage } from '../../utils/error';

interface ICheckOrganizationUserHasPermission {
  userId: string;
  permission: enums.permissions;
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
          permission: true,
        },
      },
    },
    where: {
      id: userId,
      userPermissions: {
        some: {
          userId,
          permission,
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
