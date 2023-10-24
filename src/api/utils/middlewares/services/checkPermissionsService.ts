import { ErrorMessage } from '../../error';

// #region TYPES
interface IToCheck {
  name: string;
  sublevels?: string[] | undefined;
}

export interface IPermissions {
  name: string;
  sublevels?:
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
export function checkPermissionService({ toCheck, permissions }: ICheckPermissionService) {
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

  if (!toCheck.sublevels) return;

  const subPermissionIsValid = toCheck.sublevels?.every((toCheckSubPermission) =>
    permissionBase.sublevels?.find((subPermission) => toCheckSubPermission === subPermission.name),
  );

  if (!subPermissionIsValid) {
    throw new ErrorMessage({
      statusCode: '403 FORBIDDEN',
      message: 'Permissão de acesso inválida.',
    });
  }
}
