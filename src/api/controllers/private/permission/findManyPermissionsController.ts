import { Request, Response } from 'express';

import { findManyPermissionService } from '../../../services/permission';

export async function findManyPermissionsController(_req: Request, res: Response) {
  const permissions = await findManyPermissionService();

  return res.status(200).json({
    permissions,
  });
}
