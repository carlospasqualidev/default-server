import { Response, Request } from 'express';
import { findUsersService } from '../../../services/users';
import { checkExists } from '../../../utils/validator';

export async function validateTokenController(req: Request, res: Response) {
  const user = await findUsersService({
    where: {
      id: req.user.id,
    },
  });

  checkExists([{ label: 'Usuário', value: user }]);

  return res.status(200).json({ user });
}
