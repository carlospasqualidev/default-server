import { Request, Response } from 'express';
import { findManyLenderService } from '../../../../services/lender/lender';

export async function findManyLenderContractController(_req: Request, res: Response) {
  const { lenders } = await findManyLenderService({
    page: 1,
    take: Number.MAX_SAFE_INTEGER,
    filter: '',
  });

  return res.status(200).json({
    lenders,
  });
}
