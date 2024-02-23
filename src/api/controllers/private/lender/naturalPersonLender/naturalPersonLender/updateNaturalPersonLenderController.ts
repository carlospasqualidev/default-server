import { Request, Response } from 'express';

import { checkValues } from '../../../../../utils/validator';
import {
  checkNaturalPersonLenderCPFAndRGAlreadyUsedService,
  checkNaturalPersonLenderEmailAlreadyUsedService,
  findNaturalPersonLenderByIdService,
  updateNaturalPersonLenderService,
} from '../../../../../services/lender/naturalPersonLender/naturalPersonLender';

interface IBody {
  naturalPersonLenderId: string;
  name: string;
  email: string;
  RG?: string;
  contactPhone: string;
  birthdate?: Date;
}

export async function updateNaturalPersonLenderController(req: Request, res: Response) {
  const { naturalPersonLenderId, name, email, RG, contactPhone, birthdate }: IBody = req.body;

  // #region VALIDATIONS
  checkValues([
    {
      label: 'ID do cliente',
      type: 'string',
      value: naturalPersonLenderId,
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

  await findNaturalPersonLenderByIdService({ naturalPersonLenderId });

  await checkNaturalPersonLenderEmailAlreadyUsedService({
    email: lowerCaseEmail,
    idToIgnore: naturalPersonLenderId,
  });

  await checkNaturalPersonLenderCPFAndRGAlreadyUsedService({
    RG,
    idToIgnore: naturalPersonLenderId,
  });

  // #endregion

  const naturalPersonLender = await updateNaturalPersonLenderService({
    data: {
      email: lowerCaseEmail,
      name,
      contactPhone,
      RG,
      birthdate,
    },

    naturalPersonLenderId,
  });

  return res.status(200).json({
    naturalPersonLender,
    message: 'Pessoa física atualizada com sucesso!',
  });
}
