import { Response, Request } from 'express';
import { hashSync } from 'bcrypt';
import { createUsersService, findUsersService } from '../../../services/users';

import { checkExists, checkNotExists, checkValues } from '../../../utils/validator';
import { findGendersService } from '../../../services/genders';

export async function createUsersController(req: Request, res: Response) {
  const { email, username, password, genderId, name } = req.body;

  // #region VALIDATIONS
  checkValues([
    { label: 'Email', type: 'string', value: email },
    { label: 'Nome de usuário', type: 'string', value: username },
    { label: 'Senha', type: 'string', value: password },
    { label: 'Nome', type: 'string', value: name },
    { label: 'Gênero', type: 'string', value: genderId },
  ]);

  const checkGenderId = await findGendersService({
    where: {
      id: genderId,
    },
  });
  checkExists([{ label: 'Gênero', value: checkGenderId }]);

  const checkUsername = await findUsersService({
    where: {
      username,
    },
  });
  checkNotExists([{ label: 'Nome de usuário', value: checkUsername }]);

  const checkUserEmail = await findUsersService(email);
  checkNotExists([{ label: 'Email', value: checkUserEmail }]);
  // #endregion

  const passwordHash = hashSync(password, 12);

  await createUsersService({
    data: {
      email,
      password: passwordHash,
      username,
      person: {
        create: {
          name,
          genderId,
        },
      },
    },
  });

  return res.status(201).json({ message: 'Usuário criado com sucesso.' });
}
