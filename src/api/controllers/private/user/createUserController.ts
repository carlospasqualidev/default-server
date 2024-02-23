import { Request, Response } from 'express';

import { hashSync } from 'bcrypt';
import { createUserService, checkUserEmailAlreadyUsedService } from '../../../services/user';
import { checkPassword, checkValues } from '../../../utils/validator';
import { TPermissions } from '../../../../types/permissions';
import { createInitialsAvatar } from '../../../utils/api/createInitialsAvatar';
import { handlePermissionService } from '../../../services/permission';

interface IBody {
  name: string;
  image: string;
  email: string;
  permission: TPermissions;
  password: string;
  confirmPassword: string;
}

export async function createUserController(req: Request, res: Response) {
  const { name, image, email, permission, password, confirmPassword }: IBody = req.body;

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
      value: permission,
    },
    {
      label: 'imagem',
      type: 'string',
      value: image,
      required: false,
    },
  ]);

  checkPassword({ password, confirmPassword });

  const lowerCaseEmail = email.toLowerCase();
  await checkUserEmailAlreadyUsedService({ email: lowerCaseEmail });

  // #endregion

  const permissions = await handlePermissionService({ permission });

  const user = await createUserService({
    data: {
      email: lowerCaseEmail,
      name,
      password: hashSync(password, 12),
      image: image || createInitialsAvatar(name),
      userPermissions: {
        create: permissions.map(({ id }) => ({
          permissionId: id,
        })),
      },
    },
  });

  return res.status(201).json({
    user,
    message: 'Usuário cadastrado com sucesso!',
  });
}
