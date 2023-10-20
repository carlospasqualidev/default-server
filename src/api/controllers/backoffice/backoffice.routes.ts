// #region Imports
import { Router } from 'express';
import { checkToken, userCanCreate } from '../../utils/middlewares';
import { loginController, validateTokenController } from './auth';
import {
  findUserController,
  createUsersController,
  findManyUsersController,
  deleteUserController,
} from './users';

import { findManyGendersController } from './genders';
import { uploadRouter } from '../../utils/upload/upload.routes';
// #endregion

export const backofficeRouter: Router = Router();

// #region Auth
backofficeRouter.post('/auth/login', loginController);
backofficeRouter.get('/auth/validate-token', checkToken, validateTokenController);
// #endregion

backofficeRouter.get('/teste', checkToken, userCanCreate, findManyGendersController);

// #region Users
backofficeRouter.get('/users', checkToken, findManyUsersController);
backofficeRouter.get('/users/:userId', checkToken, findUserController);
backofficeRouter.post('/users/create', checkToken, createUsersController);
backofficeRouter.put('/users/delete/:userId', checkToken, deleteUserController);
// #endregion

// #region Genders
backofficeRouter.get('/genders', checkToken, findManyGendersController);
// #endregion

// #region Upload
backofficeRouter.use('/upload', uploadRouter);
// #endregion
