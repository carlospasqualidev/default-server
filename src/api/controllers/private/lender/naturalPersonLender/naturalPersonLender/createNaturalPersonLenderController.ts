import { Request, Response } from 'express';

import { checkValues } from '../../../../../utils/validator';
import {
  createNaturalPersonLenderService,
  checkNaturalPersonLenderEmailAlreadyUsedService,
  checkNaturalPersonLenderCPFAndRGAlreadyUsedService,
} from '../../../../../services/lender/naturalPersonLender/naturalPersonLender';

interface IBody {
  name: string;
  email: string;
  CPF: string;
  RG?: string;
  contactPhone: string;
  birthdate?: Date;
}

export async function createNaturalPersonLenderController(req: Request, res: Response) {
  const { name, email, CPF, RG, contactPhone, birthdate }: IBody = req.body;

  // #region VALIDATIONS
  checkValues([
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
      label: 'CPF',
      type: 'string',
      value: CPF,
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

  await checkNaturalPersonLenderEmailAlreadyUsedService({ email: lowerCaseEmail });
  await checkNaturalPersonLenderCPFAndRGAlreadyUsedService({ CPF, RG });

  // #endregion

  const naturalPersonLender = await createNaturalPersonLenderService({
    data: {
      email: lowerCaseEmail,
      name,
      contactPhone,
      CPF,
      RG,
      birthdate,
      naturalPersonLenderAddresses: {
        create: {},
      },
      naturalPersonLenderBankInfos: {
        create: {},
      },
    },
  });

  return res.status(201).json({
    naturalPersonLender,
    message: 'Pessoa física cadastrada com sucesso!',
  });
}
