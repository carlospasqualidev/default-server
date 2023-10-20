import { Response, Request } from 'express';
import { findManyGendersService } from '../../../services/genders';

export async function findManyGendersController(_req: Request, res: Response) {
  const genders = await findManyGendersService();

  return res.status(200).json({ genders });
}
