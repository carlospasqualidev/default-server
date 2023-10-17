import { Router } from 'express';
import { authController } from './controllers/auth';

export const serverRouter = Router();

serverRouter.post('/login', authController);
