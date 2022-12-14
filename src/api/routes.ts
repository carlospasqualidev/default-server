import { Router } from 'express';
import { createUser } from './controllers/users/createUser';

export const ServerRouter = Router();

ServerRouter.post('/users', createUser);
