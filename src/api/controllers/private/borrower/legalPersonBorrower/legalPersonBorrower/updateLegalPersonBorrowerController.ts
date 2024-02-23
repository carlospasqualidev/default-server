import { Request, Response } from 'express';

import { checkValues } from '../../../../../utils/validator';
import {
  checkLegalPersonBorrowerEmailAlreadyUsedService,
  findLegalPersonBorrowerByIdService,
  updateLegalPersonBorrowerService,
} from '../../../../../services/borrower/legalPersonBorrower/legalPersonBorrower';

interface IBody {
  legalPersonBorrowerId: string;
  name: string;
  email: string;
  CNPJ: string;
  fantasyName: string;
  municipalRegistration: string;
  stateRegistration?: string;
  contactPhone: string;
  foundationDate?: string;
}

export async function updateLegalPersonBorrowerController(req: Request, res: Response) {
  const {
    legalPersonBorrowerId,
    name,
    email,
    fantasyName,
    municipalRegistration,
    foundationDate,
    stateRegistration,
    contactPhone,
  }: IBody = req.body;

  // #region VALIDATIONS
  checkValues([
    {
      label: 'Id do devedor',
      type: 'string',
      value: legalPersonBorrowerId,
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

  await findLegalPersonBorrowerByIdService({ legalPersonBorrowerId });

  await checkLegalPersonBorrowerEmailAlreadyUsedService({
    email: lowerCaseEmail,
    idToIgnore: legalPersonBorrowerId,
  });

  // #endregion

  const legalPersonBorrower = await updateLegalPersonBorrowerService({
    data: {
      name,
      email: lowerCaseEmail,
      fantasyName,
      foundationDate,
      municipalRegistration,
      stateRegistration,
      contactPhone,
    },
    legalPersonBorrowerId,
  });

  return res.status(200).json({
    legalPersonBorrower,
    message: 'Pessoa jurídica atualizada com sucesso!',
  });
}
