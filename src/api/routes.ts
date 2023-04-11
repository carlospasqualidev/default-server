import { Router } from 'express';
import { swaggerLoader, swaggerUI } from '../config/swagger';
import { authController } from './controllers/auth';

export const ServerRouter = Router();

ServerRouter.use('/docs', swaggerUI.serve, (_req: any, res: any) => {
  res.send(swaggerUI.generateHTML(swaggerLoader));
});

ServerRouter.post('/login', authController);
