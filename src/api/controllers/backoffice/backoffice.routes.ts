// #region Imports
import { Router } from 'express';

// #region MIDLEWARES
// #endregion

// #region CONTROLLERS
import { uploadRouter } from '../../utils/upload/upload.routes';

import { validateTokenController } from './auth';
import { findManyGendersController } from './genders';

import {
  findUserController,
  createUsersController,
  findManyUsersController,
  deleteUserController,
} from './users';

// #endregion

// #endregion

export const backofficeRouter: Router = Router();

// #region CheckUserAccess

// #endregion

// #region Auth
backofficeRouter.get('/auth/validate-token', validateTokenController);
// #endregion

backofficeRouter.get('/companies/:companyId/teste', findManyGendersController);

// #region Users
backofficeRouter.get('/users', findManyUsersController);
backofficeRouter.get('/users/:userId', findUserController);
backofficeRouter.post('/users/create', createUsersController);
backofficeRouter.put('/users/delete/:userId', deleteUserController);
// #endregion

// #region Genders
backofficeRouter.get('/genders', findManyGendersController);
// #endregion

// #region Upload
backofficeRouter.use('/upload', uploadRouter);
// #endregion
