import { Request, Response } from 'express';

import { checkValues } from '../../../../../utils/validator';
import {
  checkNaturalPersonBorrowerEmailAlreadyUsedService,
  checkNaturalPersonBorrowerCPFAndRGAlreadyUsedService,
  createNaturalPersonBorrowerService,
} from '../../../../../services/borrower/naturalPersonBorrower/naturalPersonBorrower';

interface IBody {
  name: string;
  email: string;
  CPF: string;
  RG?: string;
  contactPhone: string;
  birthdate?: Date;
}

export async function createNaturalPersonBorrowerController(req: Request, res: Response) {
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

  await checkNaturalPersonBorrowerEmailAlreadyUsedService({ email: lowerCaseEmail });
  await checkNaturalPersonBorrowerCPFAndRGAlreadyUsedService({ CPF, RG });

  // #endregion

  const naturalPersonBorrower = await createNaturalPersonBorrowerService({
    data: {
      email: lowerCaseEmail,
      name,
      contactPhone,
      CPF,
      RG,
      birthdate,
      naturalPersonBorrowerAddresses: {
        create: {},
      },
      naturalPersonBorrowerBankInfos: {
        create: {},
      },
    },
  });

  return res.status(201).json({
    naturalPersonBorrower,
    message: 'Pessoa física cadastrada com sucesso!',
  });
}
