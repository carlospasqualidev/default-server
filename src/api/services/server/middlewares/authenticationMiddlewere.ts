// #region IMPORTS
import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { ErrorMessage } from '../error';

import { IToken } from '../../../../types/token';
// #endregion

export const authenticationMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new ErrorMessage({
      statusCode: 401,
      message: 'Você precisa de um token válido.',
    });
  }

  try {
    const [, token] = authorization.split(' ');
    const secret: any = process.env.JWT_SECRET;

    const decoded = verify(token, secret);
    const { userId, Permissions } = decoded as IToken;

    req.userId = userId;
    req.Permissions = Permissions;

    next();
  } catch (error) {
    throw new ErrorMessage({
      statusCode: 401,
      message: 'Você precisa de um token válido.',
    });
  }
};
