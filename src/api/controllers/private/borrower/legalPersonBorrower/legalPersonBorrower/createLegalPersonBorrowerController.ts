import { Request, Response } from 'express';

import { checkValues } from '../../../../../utils/validator';

import {
  checkLegalPersonBorrowerCNPJAlreadyUsedService,
  checkLegalPersonBorrowerEmailAlreadyUsedService,
  createLegalPersonBorrowerService,
} from '../../../../../services/borrower/legalPersonBorrower/legalPersonBorrower';

interface IBody {
  name: string;
  email: string;
  CNPJ: string;
  fantasyName: string;
  municipalRegistration: string;
  stateRegistration?: string;
  contactPhone: string;
  foundationDate?: string;
}

export async function createLegalPersonBorrowerController(req: Request, res: Response) {
  const {
    name,
    email,
    CNPJ,
    fantasyName,
    municipalRegistration,
    foundationDate,
    stateRegistration,
    contactPhone,
  }: IBody = req.body;

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
      label: 'CNPJ',
      type: 'string',
      value: CNPJ,
    },
    {
      label: 'nome fantasia',
      type: 'string',
      value: fantasyName,
    },
    {
      label: 'inscrição municipal',
      type: 'string',
      value: municipalRegistration,
    },
    {
      label: 'inscrição estadual',
      type: 'string',
      value: stateRegistration,
      required: false,
    },

    {
      label: 'telefone',
      type: 'string',
      value: contactPhone,
    },
    {
      label: 'data de fundação',
      type: 'date',
      value: foundationDate,
      required: false,
    },
  ]);

  const lowerCaseEmail = email.toLowerCase();

  await checkLegalPersonBorrowerEmailAlreadyUsedService({ email: lowerCaseEmail });
  await checkLegalPersonBorrowerCNPJAlreadyUsedService({ CNPJ });

  // #endregion

  const legalPersonBorrower = await createLegalPersonBorrowerService({
    data: {
      name,
      email: lowerCaseEmail,
      CNPJ,
      fantasyName,
      foundationDate,
      municipalRegistration,
      stateRegistration,
      contactPhone,
      legalPersonBorrowerAddresses: {
        create: {},
      },
      legalPersonBorrowerBankInfos: {
        create: {},
      },
      legalPersonBorrowerResponsibles: {
        create: {},
      },
    },
  });

  return res.status(201).json({
    legalPersonBorrower,
    message: 'Pessoa jurídica cadastrada com sucesso!',
  });
}
