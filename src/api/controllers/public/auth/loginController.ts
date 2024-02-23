import { Response, Request } from 'express';
import { compare } from 'bcrypt';
import { checkValues } from '../../../utils/validator';
import { createUserAccessService, findUserByCredentialService } from '../../../services/user';
import { ErrorMessage } from '../../../utils/error';
import { generateToken } from '../../../utils/token';

interface IBody {
  email: string;
  password: string;
}

export async function loginController(req: Request, res: Response) {
  const { email, password }: IBody = req.body;

  // #region VALIDATIONS
  checkValues([
    { label: 'E-mail', type: 'string', value: email },
    { label: 'Senha', type: 'string', value: password },
  ]);

  const lowerCaseCredential = email.toLowerCase();

  const user = await findUserByCredentialService({ credential: lowerCaseCredential });

  const validPassword = await compare(password, user.password || '');

  if (!validPassword) {
    throw new ErrorMessage({
      statusCode: '403 FORBIDDEN',
      message: 'Credenciais inválidas.',
    });
  }

  if (user.isBlocked) {
    throw new ErrorMessage({
      statusCode: '403 FORBIDDEN',
      message: 'Usuário bloqueado.',
    });
  }

  // #endregion

  await createUserAccessService({
    data: {
      userId: user.id,
    },
  });

  const token = await generateToken({
    user: {
      id: user.id,
    },
  });

  req.user = user;

  return res.status(200).json({
    token,
  });
}
