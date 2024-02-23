import { Request, Response } from 'express';

import { checkValues } from '../../../../../utils/validator';
import {
  findLegalPersonBorrowerByIdService,
  updateLegalPersonBorrowerService,
} from '../../../../../services/borrower/legalPersonBorrower/legalPersonBorrower';
import { ErrorMessage } from '../../../../../utils/error';

interface IParams {
  legalPersonBorrowerId: string;
}
export async function fakeDeleteLegalPersonBorrowerController(req: Request, res: Response) {
  const { legalPersonBorrowerId } = req.params as any as IParams;

  // #region VALIDATIONS
  checkValues([
    {
      label: 'ID do devedor',
      type: 'string',
      value: legalPersonBorrowerId,
    },
  ]);

  const legalPerson = await findLegalPersonBorrowerByIdService({ legalPersonBorrowerId });

  if (legalPerson.isDeleted) {
    throw new ErrorMessage({
      statusCode: '422 UNPROCESSABLE CONTENT',
      message: 'Usuário já excluído.',
    });
  }

  // #endregion

  const legalPersonBorrower = await updateLegalPersonBorrowerService({
    data: {
      email: `${legalPerson.email}:${legalPerson.id}`,
      CNPJ: `${legalPerson.CNPJ}:${legalPerson.id}`,
      isDeleted: true,
    },

    legalPersonBorrowerId,
  });

  return res.status(200).json({
    legalPersonBorrower,
    message: 'Pessoa jurídica excluída com sucesso!',
  });
}
