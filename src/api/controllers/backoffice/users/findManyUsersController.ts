import { Response, Request } from 'express';
import { findManyUsersServices } from '../../../services/users';
import { checkIfNaN } from '../../../utils/validator';
import { forceAbsoluteNumber } from '../../../utils/dataHandler';

export async function findManyUsersController(req: Request, res: Response) {
  const { page, take, search } = req.query;

  // #region VALIDATIONS
  checkIfNaN([{ label: 'Número de registros', number: take }]);
  checkIfNaN([{ label: 'Página', number: page }]);
  // #endregion

  const users = await findManyUsersServices({
    page: forceAbsoluteNumber(String(page || 1)),
    take: forceAbsoluteNumber(String(take || 20)),
    search: String(search),
  });

  return res.status(200).json({ users });
}
