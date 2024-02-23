import { Request, Response } from 'express';

import { checkValues } from '../../../../../utils/validator';
import { findLegalPersonLenderByIdService } from '../../../../../services/lender/legalPersonLender/legalPersonLender';

interface IParams {
  legalPersonLenderId: string;
}

export async function findLegalPersonLenderController(req: Request, res: Response) {
  const { legalPersonLenderId } = req.params as any as IParams;

  // #region VALIDATIONS
  checkValues([
    {
      label: 'ID do cliente',
      type: 'string',
      value: legalPersonLenderId,
    },
  ]);

  // #endregion

  const legalPersonLender = await findLegalPersonLenderByIdService({ legalPersonLenderId });

  return res.status(200).json({
    legalPersonLender,
  });
}
