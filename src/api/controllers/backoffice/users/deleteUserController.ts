import { Response, Request } from 'express';
import { checkExists, checkValues } from '../../../utils/validator';
import { deleteUsersService, findUsersService } from '../../../services/users';

export async function deleteUserController(req: Request, res: Response) {
  const { userId } = req.params;

  // #region VALIDATIONS
  checkValues([{ label: 'Usuário', type: 'string', value: userId }]);

  const user = await findUsersService({
    where: {
      id: userId,
    },
  });

  checkExists([{ label: 'Usuário', value: user }]);
  // #endregion

  await deleteUsersService({
    where: {
      id: userId,
    },
  });

  return res.status(200).json({ message: 'Usuário excluído com sucesso.' });
}
