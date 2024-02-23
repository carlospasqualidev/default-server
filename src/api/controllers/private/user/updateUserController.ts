import { Request, Response } from 'express';

import { hashSync } from 'bcrypt';
import {
  checkUserEmailAlreadyUsedService,
  findUserByIdService,
  updateUserService,
} from '../../../services/user';

import { checkPassword, checkValues } from '../../../utils/validator';
import { TPermissions } from '../../../../types/permissions';
import { createInitialsAvatar } from '../../../utils/api/createInitialsAvatar';
import { handlePermissionService } from '../../../services/permission';

interface IBody {
  userId: string;
  name: string;
  image: string;
  email: string;
  isBlocked: boolean;
  permission: TPermissions;
  password: string;
  confirmPassword: string;
}

export async function updateUserController(req: Request, res: Response) {
  const { userId, name, image, email, isBlocked, permission, password, confirmPassword }: IBody =
    req.body;

  // #region VALIDATIONS
  checkValues([
    {
      label: 'ID do usuário',
      type: 'string',
      value: userId,
    },
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
      label: 'Status',
      type: 'boolean',
      value: isBlocked,
    },
    {
      label: 'senha',
      type: 'string',
      value: password,
      required: false,
    },
    {
      label: 'confirmação de senha',
      type: 'string',
      value: confirmPassword,
      required: false,
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

  if (password) {
    checkPassword({ password, confirmPassword });
  }

  const lowerCaseEmail = email.toLowerCase();
  await checkUserEmailAlreadyUsedService({ email: lowerCaseEmail, idToIgnore: userId });
  await findUserByIdService({ userId });

  // #endregion

  const isYourself = req.user.id === userId;
  let userPermissions;

  if (!isYourself) {
    const permissions = await handlePermissionService({ permission });
    userPermissions = {
      deleteMany: {},
      create: permissions.map(({ id }) => ({
        permissionId: id,
      })),
    };
  }

  const user = await updateUserService({
    data: {
      email: lowerCaseEmail,
      name,
      isBlocked: isYourself ? false : isBlocked,
      password: password && hashSync(password, 12),
      image: image || createInitialsAvatar(name),
      userPermissions,
    },
    userId,
  });

  return res.status(201).json({
    user,
    message: 'Usuário atualizado com sucesso!',
  });
}
