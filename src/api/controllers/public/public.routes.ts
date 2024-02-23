import { Router } from 'express';

// #region AUTH
import {
  loginController,
  recoveryPasswordController,
  sendEmailToRecoveryPasswordController,
} from './auth';

// #endregion

export const publicRouter = Router();
// #region AUTH
publicRouter.post('/login', loginController);

publicRouter.post('/send-recovery-password-email', sendEmailToRecoveryPasswordController);
publicRouter.post('/recovery-password', recoveryPasswordController);
// #endregion
