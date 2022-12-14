import { createUserService } from '../../services/database';
import { findPermissionByName } from '../../services/database/permissions/findPermissionByname';

export async function createAdmin() {
  const permissionAdmin = await findPermissionByName({ name: 'admin' });

  await createUserService({
    data: {
      name: 'Admin',
      email: 'admin@ada.com',
      image: null,
      customUrl: 'admin_url',
      password: '123123123',
      Permissions: {
        create: {
          permissionId: permissionAdmin.id,
          Settings: {
            create: {
              create: true,
              edit: true,
              view: true,
              delete: true,
            },
          },
        },
      },
    },
  });
}
