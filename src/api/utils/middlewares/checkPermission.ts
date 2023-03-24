import { IPermissions } from '../../../types/token';
import { ErrorMessage } from '../error';

interface ICheckPermission {
  toCheck: {
    permission: string;
    subPermission?: string;
  };

  permissions: IPermissions[];
}

export function checkPermission({ toCheck, permissions }: ICheckPermission) {
  // #region CHECKS
  if (!toCheck || !permissions.length) {
    throw new ErrorMessage({
      statusCode: 401,
      message: 'Permissões inválidas.',
    });
  }
  // #endregion

  let isPermited = false;

  for (let i = 0; i < permissions.length; i++) {
    if (permissions[i].name === toCheck.permission) {
      if (!toCheck.subPermission) isPermited = true;

      for (let j = 0; j < permissions[i].subPermissions.length; j++) {
        if (permissions[i].subPermissions[j].name === toCheck.subPermission) isPermited = true;
      }
    }
  }

  if (!isPermited) {
    throw new ErrorMessage({ statusCode: 401, message: 'Permissão de acesso inválida.' });
  }
}
