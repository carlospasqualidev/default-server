import { Request, Response } from 'express';
import { findManyBorrowerService } from '../../../../services/borrower/borrower';

export async function findManyBorrowerContractController(_req: Request, res: Response) {
  const { borrowers } = await findManyBorrowerService({
    page: 1,
    take: Number.MAX_SAFE_INTEGER,
    filter: '',
  });

  return res.status(200).json({
    borrowers,
  });
}
