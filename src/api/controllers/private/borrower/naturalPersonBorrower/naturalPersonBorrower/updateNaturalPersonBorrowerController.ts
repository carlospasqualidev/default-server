import { Request, Response } from 'express';

import { checkValues } from '../../../../../utils/validator';
import {
  findNaturalPersonBorrowerByIdService,
  checkNaturalPersonBorrowerEmailAlreadyUsedService,
  checkNaturalPersonBorrowerCPFAndRGAlreadyUsedService,
  updateNaturalPersonBorrowerService,
} from '../../../../../services/borrower/naturalPersonBorrower/naturalPersonBorrower';

interface IBody {
  naturalPersonBorrowerId: string;
  name: string;
  email: string;
  RG?: string;
  contactPhone: string;
  birthdate?: Date;
}

export async function updateNaturalPersonBorrowerController(req: Request, res: Response) {
  const { naturalPersonBorrowerId, name, email, RG, contactPhone, birthdate }: IBody = req.body;

  // #region VALIDATIONS
  checkValues([
    {
      label: 'ID do devedor',
      type: 'string',
      value: naturalPersonBorrowerId,
    },
    {
      label: 'nome',
      type: 'string',
      value: name,
    },
    {
      label: 'email',
      type: 'email',
      value: email,
    },
    {
      label: 'telefone',
      type: 'string',
      value: contactPhone,
    },
    {
      label: 'data de nascimento',
      type: 'date',
      value: birthdate,
      required: false,
    },
    {
      label: 'RG',
      type: 'string',
      value: RG,
      required: false,
    },
  ]);

  const lowerCaseEmail = email.toLowerCase();

  await findNaturalPersonBorrowerByIdService({ naturalPersonBorrowerId });

  await checkNaturalPersonBorrowerEmailAlreadyUsedService({
    email: lowerCaseEmail,
    idToIgnore: naturalPersonBorrowerId,
  });
  await checkNaturalPersonBorrowerCPFAndRGAlreadyUsedService({
    RG,
    idToIgnore: naturalPersonBorrowerId,
  });

  // #endregion

  const naturalPersonBorrower = await updateNaturalPersonBorrowerService({
    data: {
      email: lowerCaseEmail,
      name,
      contactPhone,
      RG,
      birthdate,
    },

    naturalPersonBorrowerId,
  });

  return res.status(200).json({
    naturalPersonBorrower,
    message: 'Pessoa física atualizada com sucesso!',
  });
}
