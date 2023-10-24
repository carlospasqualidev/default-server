/* eslint-disable no-console */
import { hashSync } from 'bcrypt';

import { findPermissionsService } from '../../src/api/services/permissions';
import { findGendersService } from '../../src/api/services/genders';

import { prisma } from '../prismaConfig';

export async function upsertBackofficeUser() {
  const accessPermission = await findPermissionsService({
    where: {
      name: 'backoffice',
    },
  });

  const ownerPermission = await findPermissionsService({
    where: {
      name: 'owner',
    },
  });

  const clientPermission = await findPermissionsService({
    where: {
      name: 'client',
    },
  });

  const genders = await findGendersService({
    where: {
      name: 'male',
    },
  });

  const company = await prisma.companies.upsert({
    create: {
      displayName: 'Empresa backoffice',
      documentCode: '123123123',
    },
    update: {},
    where: {
      documentCode: '123123123',
    },
  });

  await prisma.users.upsert({
    create: {
      email: 'backoffice@gmail.com',
      username: 'backoffice',
      password: hashSync('123123123', 12),
      permissions: {
        create: {
          permissionId: accessPermission!.id,
        },
      },
      person: {
        create: {
          name: 'Carlos Pasquali',
          genderId: genders!.id,
          companies: {
            create: {
              companyId: company.id,
              personCompanyPermissions: {
                createMany: {
                  data: [
                    ...ownerPermission!.sublevels.map((permission) => ({
                      permissionSublevelId: permission.id,
                    })),
                    ...clientPermission!.sublevels.map((permission) => ({
                      permissionSublevelId: permission.id,
                    })),
                  ],
                },
              },
            },
          },
        },
      },
    },
    update: {},
    where: {
      email: 'backoffice@gmail.com',
    },
  });
}
