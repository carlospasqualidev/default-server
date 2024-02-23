import { Request, Response } from 'express';

import { checkValues } from '../../../../../utils/validator';
import { findLegalPersonBorrowerByIdService } from '../../../../../services/borrower/legalPersonBorrower/legalPersonBorrower';

interface IParams {
  legalPersonBorrowerId: string;
}

export async function findLegalPersonBorrowerController(req: Request, res: Response) {
  const { legalPersonBorrowerId } = req.params as any as IParams;

  // #region VALIDATIONS
  checkValues([
    {
      label: 'ID do devedor',
      type: 'string',
      value: legalPersonBorrowerId,
    },
  ]);

  // #endregion

  const legalPersonBorrower = await findLegalPersonBorrowerByIdService({ legalPersonBorrowerId });

  return res.status(200).json({
    legalPersonBorrower,
  });
}
