import { enums } from '../../../../prisma';
import { checkEnums } from '../../utils/validator';

interface IFindManyPermissionsService {
  permissions: enums.permissions[];
}

export async function checkPermissionExistService({ permissions }: IFindManyPermissionsService) {
  const data = permissions.map((permission) => ({
    enums: enums.permissions,
    label: 'permissão',
    value: permission,
  }));

  checkEnums(data);
}
