// #region IMPORTS
// LIBS
import { Request, Response } from 'express';
import { compare } from 'bcrypt';

// SERVICES
import { findUserByEmail } from '../../../../../default-server-old/src/api/services/database/users';

import { checkPermission } from '../../../../../default-server-old/src/api/services/database/permissions';
import {
  checkVar,
  generateToken,
} from '../../../../../default-server-old/src/api/utils';
import { ErrorMessage } from '../../../../../default-server-old/src/api/utils/messages/ErrorMessage';
// #endregion

export const LoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  checkVar([
    { label: 'E-mail', type: 'string', variable: email },
    {
      label: 'Senha',
      type: 'string',
      variable: password,
    },
  ]);

  const User = await findUserByEmail({ email });

  checkPermission({
    permission: 'admin',
    Permissions: User.Permissions,
  });

  const checkPassword = await compare(password, User.password);

  if (!checkPassword) {
    throw new ErrorMessage({
      statusCode: 400,
      message: 'E-mail ou senha incorretos.',
    });
  }

  if (User.isBlocked) {
    throw new ErrorMessage({
      statusCode: 400,
      message:
        'Sua conta está bloqueada, entre em contato com a administração.',
    });
  }

  const token = generateToken({
    data: {
      userId: User.id,
      Permissions: User.Permissions,
    },
  });

  return res.status(200).json({
    token,
    User: {
      id: User.id,
      name: User.name,
      email: User.email,
      image: User.image,
      lastAccess: User.lastAccess,
      customUrl: User.customUrl,
      Permissions: User.Permissions,
    },
  });
};
