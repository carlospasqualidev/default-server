import { NextFunction, Request, Response } from 'express';

import { ErrorMessage } from '../../error';
import { IToken } from '../../../../types/token';
import { decodeTokenService } from '../../token';
import { findUserByIdService } from '../../../services/user';

export async function tokenMiddleware(req: Request, _res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new ErrorMessage({
      statusCode: '401 UNAUTHORIZED',
      message: 'Token inválido.',
    });
  }

  try {
    const [, token] = authorization.split(' ');

    const { user } = decodeTokenService({ token }) as IToken;

    const userData = await findUserByIdService({ userId: user.id });

    if (userData.isBlocked) {
      throw new ErrorMessage({
        statusCode: '401 UNAUTHORIZED',
        message: 'Usuário bloqueado.',
      });
    }

    req.user = user;

    next();
  } catch (error) {
    throw new ErrorMessage({
      statusCode: '401 UNAUTHORIZED',
      message: 'Token inválido.',
    });
  }
}
