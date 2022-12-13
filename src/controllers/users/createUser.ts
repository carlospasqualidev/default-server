import { Request, Response } from 'express';
import { createUserService } from '../../services';

export async function createUser(req: Request, res: Response) {
  const user = await createUserService({
    data: {
      email: 'carlosdpasqualip@hotmail.com',
      isBlocked: false,
      name: 'Carlos Pasquali',
      passwordHash: '123123123',
    },
  });

  return res.status(200).json({
    message: 'usuario cadastrado com sucesso',
    user,
  });
}
