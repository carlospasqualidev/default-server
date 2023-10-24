import { ErrorMessage } from '../../error';

// #region TYPES
interface IToCheck {
  name: string;
  subPermissions?: string[] | undefined;
}

export interface IPermissions {
  name: string;
  subPermissions?:
    | {
        name: string;
      }[]
    | undefined;
}

export interface ICheckPermissionService {
  toCheck: IToCheck;
  permissions: IPermissions[];
}

// #endregion

/**
 *@example checkPersonPermission({
              toCheck: { name: 'user',
              subPermissions: ['create', 'read', 'update', 'delete'] }, //optional
              permissions,
  });
 */
export function checkPersonPermissionService({ toCheck, permissions }: ICheckPermissionService) {
  // #region CHECKS

  if (!toCheck || !permissions || !permissions.length) {
    throw new ErrorMessage({
      statusCode: '403 FORBIDDEN',
      message: 'Permissões inválidas.',
    });
  }
  // #endregion

  const permissionBase = permissions.find((permission) => permission.name === toCheck.name);

  if (!permissionBase) {
    throw new ErrorMessage({
      statusCode: '403 FORBIDDEN',
      message: 'Permissão de acesso inválida.',
    });
  }

  if (!toCheck.subPermissions) return;

  const subPermissionIsValid = toCheck.subPermissions?.every((toCheckSubPermission) =>
    permissionBase.subPermissions?.find(
      (subPermission) => toCheckSubPermission === subPermission.name,
    ),
  );

  if (!subPermissionIsValid) {
    throw new ErrorMessage({
      statusCode: '403 FORBIDDEN',
      message: 'Permissão de acesso inválida.',
    });
  }
}
