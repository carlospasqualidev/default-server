/* eslint-disable no-console */

import {
  createPersonPermissionsService,
  findPersonPermissionsService,
} from '../../src/api/services/personPermissions';
import { prisma } from '../prismaConfig';

interface IPermission {
  name: string;
  type: string;
  subPermissions: {
    name: string;
  }[];
}

async function createPermission(data: IPermission) {
  const ownerPermission = await findPersonPermissionsService({
    where: {
      name: data.name,
      type: data.type,
    },
  });

  if (!ownerPermission) {
    await createPersonPermissionsService({
      name: data.name,
      type: data.type,
      subPermissions: {
        createMany: {
          data: data.subPermissions.map((subPermission) => ({
            name: subPermission.name,
          })),
        },
      },
    });
    console.log(`Permissions ${data.name} inserted.`);
  }

  if (ownerPermission) {
    data.subPermissions.forEach(async (subPermission) => {
      const subPermissionNotFound = ownerPermission.subPermissions.some(
        (ownerSubPermission) => subPermission.name === ownerSubPermission.name,
      );

      if (!subPermissionNotFound) {
        await prisma.personSubPermissions.create({
          data: { name: subPermission.name, permissionId: ownerPermission.id },
        });

        console.log(`Sub permissions ${subPermission.name} inserted.`);
      }
    });
  }
}

export async function upsertPersonPermissions() {
  await createPermission({
    name: 'owner',
    type: 'company',
    subPermissions: [
      {
        name: 'create',
      },
      {
        name: 'read',
      },
      {
        name: 'update',
      },
      {
        name: 'delete',
      },
    ],
  });

  await createPermission({
    name: 'collaborator',
    type: 'company',
    subPermissions: [
      {
        name: 'create',
      },
      {
        name: 'read',
      },
      {
        name: 'update',
      },
      {
        name: 'delete',
      },
    ],
  });
}
