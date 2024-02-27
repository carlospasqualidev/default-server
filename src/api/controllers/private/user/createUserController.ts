import { Request, Response } from 'express';

import { hashSync } from 'bcrypt';
import { createUserService, checkUserEmailAlreadyUsedService } from '../../../services/user';
import { checkPassword, checkValues } from '../../../utils/validator';
import { createInitialsAvatar } from '../../../utils/api/createInitialsAvatar';
import { enums } from '../../../../../prisma';
import { checkPermissionExistService } from '../../../services/permission';

interface IBody {
  name: string;
  image: string;
  email: string;
  permissions: enums.permissions[];
  password: string;
  confirmPassword: string;
}

export async function createUserController(req: Request, res: Response) {
  const { name, image, email, permissions, password, confirmPassword }: IBody = req.body;

  // #region VALIDATIONS
  checkValues([
    {
      label: 'nome',
      type: 'string',
      value: name,
    },
    {
      label: 'email',
      type: 'email',
      value: email,
    },
    {
      label: 'senha',
      type: 'string',
      value: password,
    },
    {
      label: 'confirmação de senha',
      type: 'string',
      value: confirmPassword,
    },
    {
      label: 'permission',
      type: 'string',
      value: permissions,
    },
    {
      label: 'imagem',
      type: 'string',
      value: image,
      required: false,
    },
  ]);

  await checkPassword({ password, confirmPassword });

  await checkPermissionExistService({ permissions });

  const lowerCaseEmail = email.toLowerCase();
  await checkUserEmailAlreadyUsedService({ email: lowerCaseEmail });

  // #endregion

  const user = await createUserService({
    data: {
      email: lowerCaseEmail,
      name,
      password: hashSync(password, 12),
      image: image || createInitialsAvatar(name),
      userPermissions: {
        create: permissions.map((permission) => ({
          permission,
        })),
      },
    },
  });

  return res.status(201).json({
    user,
    message: 'Usuário cadastrado com sucesso!',
  });
}
