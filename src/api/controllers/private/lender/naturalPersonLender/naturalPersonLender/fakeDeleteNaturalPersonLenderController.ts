import { Request, Response } from 'express';

import { checkValues } from '../../../../../utils/validator';
import {
  findNaturalPersonLenderByIdService,
  updateNaturalPersonLenderService,
} from '../../../../../services/lender/naturalPersonLender/naturalPersonLender';
import { ErrorMessage } from '../../../../../utils/error';

interface IParams {
  naturalPersonLenderId: string;
}
export async function fakeDeleteNaturalPersonLenderController(req: Request, res: Response) {
  const { naturalPersonLenderId } = req.params as any as IParams;

  // #region VALIDATIONS
  checkValues([
    {
      label: 'ID do cliente',
      type: 'string',
      value: naturalPersonLenderId,
    },
  ]);

  const naturalPerson = await findNaturalPersonLenderByIdService({ naturalPersonLenderId });

  if (naturalPerson.isDeleted) {
    throw new ErrorMessage({
      statusCode: '422 UNPROCESSABLE CONTENT',
      message: 'Usuário já excluído.',
    });
  }

  // #endregion

  const naturalPersonLender = await updateNaturalPersonLenderService({
    data: {
      email: `${naturalPerson.email}:${naturalPerson.id}`,
      CPF: `${naturalPerson.CPF}:${naturalPerson.id}`,
      RG: naturalPerson.RG && `${naturalPerson.RG}:${naturalPerson.id}`,
      isDeleted: true,
    },

    naturalPersonLenderId,
  });

  return res.status(200).json({
    naturalPersonLender,
    message: 'Pessoa física excluída com sucesso!',
  });
}
