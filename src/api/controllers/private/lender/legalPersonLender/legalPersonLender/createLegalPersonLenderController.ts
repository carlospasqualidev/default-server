import { Request, Response } from 'express';

import { checkValues } from '../../../../../utils/validator';
import {
  checkLegalPersonLenderCNPJAlreadyUsedService,
  checkLegalPersonLenderEmailAlreadyUsedService,
  createLegalPersonLenderService,
} from '../../../../../services/lender/legalPersonLender/legalPersonLender';

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

export async function createLegalPersonLenderController(req: Request, res: Response) {
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

  await checkLegalPersonLenderEmailAlreadyUsedService({ email: lowerCaseEmail });
  await checkLegalPersonLenderCNPJAlreadyUsedService({ CNPJ });

  // #endregion

  const legalPersonLender = await createLegalPersonLenderService({
    data: {
      name,
      email: lowerCaseEmail,
      CNPJ,
      fantasyName,
      foundationDate,
      municipalRegistration,
      stateRegistration,
      contactPhone,
      legalPersonLenderAddresses: {
        create: {},
      },
      legalPersonLenderBankInfos: {
        create: {},
      },
      legalPersonLenderResponsibles: {
        create: {},
      },
    },
  });

  return res.status(201).json({
    legalPersonLender,
    message: 'Pessoa jurídica cadastrada com sucesso!',
  });
}
