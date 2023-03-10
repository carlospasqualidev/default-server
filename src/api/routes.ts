import { Router } from 'express';

export const ServerRouter = Router();

ServerRouter.get('/teste', () => {
  const user = {
    name: 'fasfhajfk',
  };
  console.log('fff');
  return user;
});
