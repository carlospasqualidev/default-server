/* eslint-disable no-console */
import { hashSync } from 'bcrypt';
import { createUsersService } from '../../src/api/services/users';
import { findAccessPermissionsService } from '../../src/api/services/accessPermissions';

export async function upsertBackofficeUser() {
  const permission = await findAccessPermissionsService({
    where: {
      name: 'backoffice',
    },
  });

  await createUsersService({
    data: {
      email: 'backoffice@gmail.com',
      password: hashSync('123123123', 12),
      username: 'backoffice',
      permissions: {
        create: {
          permissionId: permission!.id,
        },
      },
    },
  });
}
