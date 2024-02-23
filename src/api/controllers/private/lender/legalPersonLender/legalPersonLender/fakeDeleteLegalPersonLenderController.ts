import { Request, Response } from 'express';

import { checkValues } from '../../../../../utils/validator';

import { ErrorMessage } from '../../../../../utils/error';
import {
  findLegalPersonLenderByIdService,
  updateLegalPersonLenderService,
} from '../../../../../services/lender/legalPersonLender/legalPersonLender';

interface IParams {
  legalPersonLenderId: string;
}
export async function fakeDeleteLegalPersonLenderController(req: Request, res: Response) {
  const { legalPersonLenderId } = req.params as any as IParams;

  // #region VALIDATIONS
  checkValues([
    {
      label: 'ID do cliente',
      type: 'string',
      value: legalPersonLenderId,
    },
  ]);

  const legalPerson = await findLegalPersonLenderByIdService({ legalPersonLenderId });

  if (legalPerson.isDeleted) {
    throw new ErrorMessage({
      statusCode: '422 UNPROCESSABLE CONTENT',
      message: 'Usuário já excluído.',
    });
  }

  // #endregion

  const legalPersonLender = await updateLegalPersonLenderService({
    data: {
      email: `${legalPerson.email}:${legalPerson.id}`,
      CNPJ: `${legalPerson.CNPJ}:${legalPerson.id}`,
      isDeleted: true,
    },

    legalPersonLenderId,
  });

  return res.status(200).json({
    legalPersonLender,
    message: 'Pessoa jurídica excluída com sucesso!',
  });
}
