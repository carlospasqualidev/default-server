import { Request, Response } from 'express';
import { hashSync } from 'bcrypt';
import { checkPassword, checkValues } from '../../../utils/validator';
import { findUserByIdService, updateUserPasswordService } from '../../../services/user';
import { decodeTokenService, findTokenService, markTokenAsUsed } from '../../../utils/token';

interface IBody {
  userId: string;
  password: string;
  confirmPassword: string;
  token: string;
}

interface IToken {
  userId: string;
}

export async function recoveryPasswordController(req: Request, res: Response) {
  const { token, password, confirmPassword }: IBody = req.body;

  // #region VALIDATIONS
  checkValues([
    { label: 'Token', value: token, type: 'string' },
    { label: 'Senha', value: password, type: 'string' },
    { label: 'Confirmação de senha', value: confirmPassword, type: 'string' },
  ]);

  await checkPassword({
    password,
    confirmPassword,
  });

  await findTokenService({ token });

  const { userId } = decodeTokenService({ token }) as IToken;

  await findUserByIdService({ userId });

  // #enregion

  await updateUserPasswordService({
    userId,
    password: hashSync(password, 12),
  });

  await markTokenAsUsed({ token });

  return res.status(200).json({ message: 'Senha alterada com sucesso!' });
}
