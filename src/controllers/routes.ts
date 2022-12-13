import { Router } from 'express';
import { userRouter } from './users/user.routes';

export const ControllerRouter = Router();

ControllerRouter.use('/user', userRouter);
