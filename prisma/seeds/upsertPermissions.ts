/* eslint-disable no-console */
import { prisma } from '../prismaConfig';

export async function upsertPermissions() {
  // #region PERMISSIONS TYPES
  const accessPermission = await prisma.permissionTypes.upsert({
    create: {
      name: 'access',
    },
    update: {},
    where: {
      name: 'access',
    },
  });

  const companyPermission = await prisma.permissionTypes.upsert({
    create: {
      name: 'company',
    },
    update: {},
    where: {
      name: 'company',
    },
  });

  // #endregion

  // #region PERMISSIONS

  const permissions = [
    {
      name: 'backoffice',
      accessPermissionId: accessPermission.id,
      subPermissions: [],
    },
    {
      name: 'client',
      accessPermissionId: accessPermission.id,
      subPermissions: ['create', 'read', 'update', 'delete'],
    },
    {
      name: 'owner',
      accessPermissionId: companyPermission.id,
      subPermissions: ['create', 'read', 'update', 'delete'],
    },
  ];

  for (let i = 0; i < permissions.length; i++) {
    await prisma.permissions.upsert({
      create: {
        name: permissions[i].name,
        permissionTypeId: permissions[i].accessPermissionId,
        sublevels:
          permissions[i].subPermissions.length > 0
            ? {
                createMany: {
                  data: permissions[i].subPermissions?.map((subPermission) => ({
                    name: subPermission,
                  })),
                },
              }
            : undefined,
      },
      update: {},
      where: {
        name: permissions[i].name,
      },
    });
  }

  // #endregion
}
