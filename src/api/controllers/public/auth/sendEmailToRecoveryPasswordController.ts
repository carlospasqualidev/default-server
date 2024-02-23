import { Request, Response } from 'express';
import { createTokenService, generateToken } from '../../../utils/token';
import { findUserByEmailService } from '../../../services/user/findUserByEmailService';
import { sendEmailToRecoveryPasswordTransporter } from '../../../utils/email';
import { checkValues } from '../../../utils/validator';

interface IBody {
  email: string;
}

export async function sendEmailToRecoveryPasswordController(req: Request, res: Response) {
  const { email }: IBody = req.body;

  // #region VALIDATIONS
  checkValues([
    {
      label: 'E-mail',
      value: email,
      type: 'email',
    },
  ]);

  const user = await findUserByEmailService({ email });
  // #enregion

  // #region TOKEN
  const token = await generateToken({ userId: user.id });

  await createTokenService({
    token,
  });

  // #endregion

  await sendEmailToRecoveryPasswordTransporter({ toEmail: email, token });

  return res.status(200).json({ message: 'E-mail para recuperação de senha enviado com sucesso!' });
}
