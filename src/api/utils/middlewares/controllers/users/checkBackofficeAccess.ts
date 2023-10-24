import { NextFunction, Request, Response } from 'express';
import { findUsersService } from '../../../../services/users';
import { checkPermissionService } from '../../services';
import { checkExists } from '../../../validator';

export async function checkBackofficeAccess(req: Request, _res: Response, next: NextFunction) {
  const { user } = req;

  // #region VALIDATIONS

  checkExists([
    {
      label: 'Usuário',
      value: user,
    },
  ]);

  const userData = await findUsersService({
    where: {
      id: user.id,
    },
  });

  // #endregion

  const permissions = userData.permissions.map(({ permission }) => ({ name: permission!.name }));

  checkPermissionService({
    toCheck: {
      name: 'backoffice',
    },
    permissions,
  });

  next();
}
