import { Router } from 'express';

// #region PERMISSION
import { findManyPermissionsController } from './permission/findManyPermissionsController';

// #region USER
import { createUserController, findManyUserController, updateUserController } from './user';

// #endregion

// #region UPLOAD
import { uploadRouter } from '../../utils/upload/upload.routes';
import { privateUserCreateMiddleware } from '../../utils/middlewares/private';
// #endregion

export const privateRouter = Router();

// #region PERMISSIONS
privateRouter.get('/permissions', findManyPermissionsController);
// #endregion

// #region UPLOAD
privateRouter.use('/uploads', uploadRouter);
// #endregion

// #region USER
privateRouter.get('/users', findManyUserController);
privateRouter.post('/users', privateUserCreateMiddleware, createUserController);
privateRouter.put('/users', updateUserController);
// #endregion
