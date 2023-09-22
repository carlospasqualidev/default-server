import { Router } from 'express';
import { authController } from './controllers/auth';
import {
  createUsersService,
  deleteUsersService,
  findUsersService,
  updateUsersService,
} from './services/users';

export const serverRouter = Router();

serverRouter.post('/login', authController);

serverRouter.get('/test', async (_req, res) => {
  await createUsersService([
    {
      name: 'Teste',
      password: '123456',
      email: 'carlos@gmail.com',
      customUrl: 'Urlpersonalizada',
      permissions: {
        createMany: {
          data: [
            {
              permissionId: '826ca21f-d09e-4545-bc74-7452c8531aa2',
            },
            {
              permissionId: '5e9c9118-7d27-48f1-aa3e-e645f3239909',
            },
          ],
        },
      },
    },

    {
      name: 'Teste2',
      password: '123456',
      email: 'jorge@gmail.com',
      customUrl: 'Urlpersonalizada',
      permissions: {
        createMany: {
          data: [
            {
              permissionId: '826ca21f-d09e-4545-bc74-7452c8531aa2',
            },
            {
              permissionId: '5e9c9118-7d27-48f1-aa3e-e645f3239909',
            },
          ],
        },
      },
    },
  ]);

  await updateUsersService([
    {
      id: '1b963be4-3da1-4171-9dbc-b03f433adcd3',

      data: {
        name: 'editado por id',
      },
    },
    {
      email: 'jorge@gmail.com',

      data: {
        name: 'editado por email',
        email: 'email@gmail.com',
        image: 'https://avatars.githubusercontent.com/u/59853942?v=4',
      },
    },
  ]);

  await findUsersService({
    id: '1b963be4-3da1-4171-9dbc-b03f433adcd3',

    options: {
      orderBy: { image: 'asc' },
      skip: 1,
      take: 1,
    },

    data: {
      id: true,
      email: true,
    },
  });

  await deleteUsersService([
    {
      id: '1b963be4-3da1-4171-9dbc-b03f433adcd3',
    },
    {
      email: 'jorge@gmail.com',
    },
  ]);

  return res.status(201).json({ message: 'ok' });
});
