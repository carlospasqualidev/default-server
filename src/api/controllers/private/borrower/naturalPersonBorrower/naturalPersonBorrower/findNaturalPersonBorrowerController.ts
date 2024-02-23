import { Request, Response } from 'express';

import { checkValues } from '../../../../../utils/validator';
import { findNaturalPersonBorrowerByIdService } from '../../../../../services/borrower/naturalPersonBorrower/naturalPersonBorrower';

interface IParams {
  naturalPersonBorrowerId: string;
}

export async function findNaturalPersonBorrowerController(req: Request, res: Response) {
  const { naturalPersonBorrowerId } = req.params as any as IParams;
  // #region VALIDATIONS
  checkValues([
    {
      label: 'ID do devedor',
      type: 'string',
      value: naturalPersonBorrowerId,
    },
  ]);

  // #endregion

  const naturalPersonBorrower = await findNaturalPersonBorrowerByIdService({
    naturalPersonBorrowerId,
  });

  return res.status(200).json({
    naturalPersonBorrower,
  });
}
