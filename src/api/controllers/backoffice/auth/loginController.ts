import { Response, Request } from 'express';
import { compare } from 'bcrypt';
import { generateToken } from '../../../utils/token';
import { checkValues } from '../../../utils/validator';
import { findUsersService } from '../../../services/users';
import { ErrorMessage } from '../../../utils/error';
import { createAccessesService } from '../../../services/access/createAccessesService';

export async function backofficeLoginController(req: Request, res: Response) {
  const { credential, password } = req.body;

  // #region VALIDATIONS
  checkValues([
    { label: 'Credencial de acesso', type: 'string', value: credential },
    { label: 'Senha', type: 'string', value: password },
  ]);

  const lowerCaseCredential = credential.toLowerCase();

  const user = await findUsersService({
    where: {
      OR: [
        {
          email: lowerCaseCredential,
        },
        {
          username: lowerCaseCredential,
        },
      ],
    },
  });

  const validPassword = await compare(password, user?.password || '');

  if (!user || !validPassword) {
    throw new ErrorMessage({
      statusCode: '400 BAD REQUEST',
      message: 'Credenciais inválidas.',
    });
  }

  if (user.isBlocked) {
    throw new ErrorMessage({
      statusCode: '403 FORBIDDEN',
      message: 'Sua conta está bloqueada.',
    });
  }
  // #endregion

  await createAccessesService({
    data: {
      environment: 'backoffice',
      users: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  const token = await generateToken({
    user: {
      id: user.id,
    },
  });

  return res.status(200).json({ token });
}
