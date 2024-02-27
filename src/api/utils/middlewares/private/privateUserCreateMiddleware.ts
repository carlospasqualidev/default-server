import { NextFunction, Request, Response } from 'express';
import { checkUserHasPermissionService } from '../../../services/user/checkUserHasPermissionService';
import { ErrorMessage } from '../../error';

export async function privateUserCreateMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const { user } = req;

  if (!user) {
    throw new ErrorMessage({
      statusCode: '404 NOT FOUND',
      message: 'Usuário não encontrado no req.',
    });
  }

  await checkUserHasPermissionService({
    userId: user.id,
    permission: 'userCreate',
  });

  next();
}
