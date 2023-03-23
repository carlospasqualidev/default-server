import { compare } from 'bcrypt';
import { Response, Request } from 'express';
import { findEmailToLoginService } from '../../services/database/auth';
import { updateLastAccessService } from '../../services/database/user/updateLastAccessService';
import { ErrorMessage } from '../../services/server/error';
import { checkPermission } from '../../services/server/middlewares';
import { generateToken } from '../../services/server/token';
import { checkVar } from '../../services/server/validator';

export async function authController(req: Request, res: Response) {
  const { email, password } = req.body;

  checkVar([
    { label: 'email', type: 'string', variable: email },
    { label: 'senha', type: 'string', variable: password },
  ]);

  const { user, permissions } = await findEmailToLoginService(email);

  const isValidPassword = await compare(password, user.password);

  if (!isValidPassword) {
    throw new ErrorMessage({
      statusCode: 404,
      message: 'E-mail ou senha incorreto.',
    });
  }

  if (user.isBlocked) {
    throw new ErrorMessage({
      statusCode: 401,
      message: 'Sua conta está bloqueada, entre em contato com a administração.',
    });
  }

  checkPermission({
    toCheck: {
      permission: 'user',
    },
    permissions,
  });

  await updateLastAccessService(user.id);

  const token = generateToken({
    user: {
      id: user.id,
      permissions,
    },
  });

  return res.status(200).json({
    token,
  });
}
