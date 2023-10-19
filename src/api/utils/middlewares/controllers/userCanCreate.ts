import { NextFunction, Request, Response } from 'express';
import { checkPermissionService } from '../services';

export async function userCanCreate(req: Request, _res: Response, next: NextFunction) {
  const { permissions } = req.user;

  checkPermissionService({
    toCheck: {
      permission: 'user',
      subPermission: ['create', 'read'], // opcional
    },
    permissions,
  });

  next();
}
