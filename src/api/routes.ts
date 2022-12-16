import { Router } from 'express';
import { LoginController } from './controllers/authentication';
import { authenticationMiddleware } from './services/server/middlewares';

export const ServerRouter = Router();

ServerRouter.post('/login', LoginController);

ServerRouter.post('/teste', authenticationMiddleware, () => {
  console.log('fff');
});

ServerRouter.post('/fuck', authenticationMiddleware, () => {
  console.log('fff');
});
