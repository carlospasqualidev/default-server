import { Router } from 'express';
import { Login } from './controllers/authentication/login';
import { authenticationMiddleware } from './services/server/middlewares/authenticationMiddlewere';

export const ServerRouter = Router();

ServerRouter.post('/login', Login);

ServerRouter.post('/teste', authenticationMiddleware, () => {
  console.log('fff');
});

ServerRouter.post('/fuck', authenticationMiddleware, () => {
  console.log('fff');
});
