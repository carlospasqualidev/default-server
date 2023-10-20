import { Response, Request } from 'express';
import { findUsersService } from '../../../services/users';
import { checkExists, checkValues } from '../../../utils/validator';

export async function findUserController(req: Request, res: Response) {
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

  return res.status(200).json({ user });
}
