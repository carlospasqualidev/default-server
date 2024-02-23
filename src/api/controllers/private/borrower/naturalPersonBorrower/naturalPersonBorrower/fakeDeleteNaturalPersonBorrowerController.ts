import { Request, Response } from 'express';

import { checkValues } from '../../../../../utils/validator';

import { ErrorMessage } from '../../../../../utils/error';
import {
  findNaturalPersonBorrowerByIdService,
  updateNaturalPersonBorrowerService,
} from '../../../../../services/borrower/naturalPersonBorrower/naturalPersonBorrower';

interface IParams {
  naturalPersonBorrowerId: string;
}
export async function fakeDeleteNaturalPersonBorrowerController(req: Request, res: Response) {
  const { naturalPersonBorrowerId } = req.params as any as IParams;

  // #region VALIDATIONS
  checkValues([
    {
      label: 'ID do devedor',
      type: 'string',
      value: naturalPersonBorrowerId,
    },
  ]);

  const naturalPerson = await findNaturalPersonBorrowerByIdService({ naturalPersonBorrowerId });

  if (naturalPerson.isDeleted) {
    throw new ErrorMessage({
      statusCode: '422 UNPROCESSABLE CONTENT',
      message: 'Usuário já excluído.',
    });
  }

  // #endregion

  const naturalPersonBorrower = await updateNaturalPersonBorrowerService({
    data: {
      email: `${naturalPerson.email}:${naturalPerson.id}`,
      CPF: `${naturalPerson.CPF}:${naturalPerson.id}`,
      RG: naturalPerson.RG && `${naturalPerson.RG}:${naturalPerson.id}`,
      isDeleted: true,
    },

    naturalPersonBorrowerId,
  });

  return res.status(200).json({
    naturalPersonBorrower,
    message: 'Pessoa física excluída com sucesso!',
  });
}
