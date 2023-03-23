import { Router } from 'express';
import { swaggerLoader, swaggerUI } from '../config/swagger';
import { authController } from './controllers/auth';

import { checkToken } from './services/server/middlewares/checkToken';
import { userCanCreate } from './services/server/middlewares/permissions/user';

export const ServerRouter = Router();

ServerRouter.use('/docs', swaggerUI.serve, (_req: any, res: any) => {
  res.send(swaggerUI.generateHTML(swaggerLoader));
});

ServerRouter.post('/login', authController);

ServerRouter.get('/teste', checkToken, userCanCreate, (req, res) => {
  res.status(200).json({ d: 'DEU' });
});
