// LIBS
import { Router } from 'express';

// FUNCTIONS
import { uploadMany } from './uploadMany';

// ROUTES
export const uploadRouter = Router();

uploadRouter.post('/file', uploadMany);
