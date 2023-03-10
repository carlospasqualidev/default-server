/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { ErrorMessage } from './ErrorMessage';

export const errorHandler = async (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ErrorMessage) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  if (
    process.env.DATABASE_URL?.includes('sandbox') ||
    process.env.DATABASE_URL?.includes('production')
  ) {
    axios.post('https://ada-logs.herokuapp.com/api/logs/create', {
      projectName: 'changehere',
      environment: process.env.DATABASE_URL?.includes('sandbox')
        ? 'Sandbox'
        : 'Production',
      side: 'Server',
      errorStack: err.stack,
    });
  }
  // eslint-disable-next-line no-console
  console.log(
    '\n\n\n ❌ Error ❌ \n\n\n',
    'Error Message: ',
    err.stack,
    '\n\n\n',
  );

  return res.status(500).json({
    message: `Oops! Encontramos um problema e nossa equipe foi notificada.`,
  });
};
