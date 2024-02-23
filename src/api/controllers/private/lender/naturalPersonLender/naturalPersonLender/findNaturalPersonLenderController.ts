import { Request, Response } from 'express';

import { checkValues } from '../../../../../utils/validator';
import { findNaturalPersonLenderByIdService } from '../../../../../services/lender/naturalPersonLender/naturalPersonLender';

interface IParams {
  naturalPersonLenderId: string;
}

export async function findNaturalPersonLenderController(req: Request, res: Response) {
  const { naturalPersonLenderId } = req.params as any as IParams;

  // #region VALIDATIONS
  checkValues([
    {
      label: 'ID do cliente',
      type: 'string',
      value: naturalPersonLenderId,
    },
  ]);

  // #endregion

  const naturalPersonLender = await findNaturalPersonLenderByIdService({ naturalPersonLenderId });

  return res.status(200).json({
    naturalPersonLender,
  });
}
