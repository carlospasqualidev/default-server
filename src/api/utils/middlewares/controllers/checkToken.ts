import { NextFunction, Request, Response } from 'express';

import { ErrorMessage } from '../../error';
import { decodeTokenService } from '../../token';
import { IToken } from '../../../../types/token';

export function checkToken(req: Request, _res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new ErrorMessage({
      statusCode: '401 UNAUTHORIZED',
      message: 'Token inválido.',
    });
  }

  try {
    const [, token] = authorization.split(' ');

    const { user } = decodeTokenService(token) as IToken;

    req.user = user;

    next();
  } catch (error) {
    throw new ErrorMessage({
      statusCode: '401 UNAUTHORIZED',
      message: 'Token inválido.',
    });
  }
}
