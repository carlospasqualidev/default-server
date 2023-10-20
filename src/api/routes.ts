import { Router } from 'express';
import { backofficeRouter } from './controllers/backoffice/backoffice.routes';

export const serverRouter = Router();

serverRouter.use('/backoffice', backofficeRouter);
