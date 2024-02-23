import { Request, Response } from 'express';
import { findUserByIdService, updateUserService } from '../../../services/user';

import { checkValues } from '../../../utils/validator';
import { ErrorMessage } from '../../../utils/error';

interface IParams {
  userId: string;
}

export async function fakeDeleteUserController(req: Request, res: Response) {
  const { userId } = req.params as any as IParams;

  // #region VALIDATIONS
  checkValues([
    {
      label: 'ID do usuário',
      type: 'string',
      value: userId,
    },
  ]);

  const isYourself = req.user.id === userId;

  if (isYourself) {
    throw new ErrorMessage({
      statusCode: '403 FORBIDDEN',
      message: 'Você não pode deletar a si mesmo.',
    });
  }

  const user = await findUserByIdService({ userId });

  if (user.isDeleted) {
    throw new ErrorMessage({
      statusCode: '422 UNPROCESSABLE CONTENT',
      message: 'Usuário já excluído.',
    });
  }

  // #endregion

  await updateUserService({
    data: {
      email: `${user.email}:${user.id}`,
      isDeleted: true,
    },
    userId,
  });

  return res.status(201).json({
    user,
    message: 'Usuário excluído com sucesso!',
  });
}
