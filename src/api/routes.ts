import { Router } from 'express';

import { checkToken } from './utils/token';
import { checkBackofficeAccess } from './utils/middlewares/controllers/users';

// #region ROUTERS
import { backofficeLoginController } from './controllers/backoffice/auth';
import { backofficeRouter } from './controllers/backoffice/backoffice.routes';
// #endregion

export const serverRouter = Router();

// #region AUTHS
serverRouter.post('/backoffice/auth/login', backofficeLoginController);
// #endregion

serverRouter.use('/backoffice', checkToken, checkBackofficeAccess, backofficeRouter);
