import { Router } from 'express';

import { createUser } from './createUser';

export const userRouter = Router();

userRouter.get('/create', createUser);
