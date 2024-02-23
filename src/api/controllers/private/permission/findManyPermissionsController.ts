import { Request, Response } from 'express';

import { findManyPermissionsService } from '../../../services/permission';

export async function findManyPermissionsController(_req: Request, res: Response) {
  const permissions = await findManyPermissionsService();

  return res.status(200).json({
    permissions,
  });
}
