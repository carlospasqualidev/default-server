import { createManyPermissions } from '../../services/database/permissions';

export async function createPermissions() {
  await createManyPermissions({
    data: [
      {
        name: 'admin',
      },
      {
        name: 'user',
      },
    ],
  });
}
