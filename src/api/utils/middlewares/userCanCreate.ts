import { NextFunction, Request, Response } from 'express';
import { checkPersonPermissionService } from './services';

export async function userCanCreate(req: Request, _res: Response, next: NextFunction) {
  const { permissions } = req.user;
  checkPersonPermissionService({
    toCheck: {
      permission: 'backoffice',
      subPermission: ['create', 'read'], // opcional
    },
    permissions,
  });

  next();
}
