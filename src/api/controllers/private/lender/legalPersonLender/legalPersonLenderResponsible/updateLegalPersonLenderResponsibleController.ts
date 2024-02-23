import { Request, Response } from 'express';

import { checkValues } from '../../../../../utils/validator';
import {
  checkLegalPersonLenderResponsibleAlreadyUseCPFService,
  checkLegalPersonLenderResponsibleAlreadyUseEmailService,
  findLegalPersonLenderResponsibleByIdService,
  updateLegalPersonLenderResponsibleService,
} from '../../../../../services/lender/legalPersonLender/legalPersonLenderReponsible';

interface IBody {
  legalPersonLenderResponsibleId: string;
  name: string;
  email: string;
  CPF: string;
  contactPhone: string;
}

export async function updateLegalPersonLenderResponsibleController(req: Request, res: Response) {
  const { legalPersonLenderResponsibleId, CPF, contactPhone, email, name }: IBody = req.body;

  // #region VALIDATIONS
  checkValues([
    {
      label: 'ID do responsável',
      type: 'string',
      value: legalPersonLenderResponsibleId,
    },
  ]);

  await findLegalPersonLenderResponsibleByIdService({ legalPersonLenderResponsibleId });

  await checkLegalPersonLenderResponsibleAlreadyUseCPFService({
    CPF,
    idToIgnore: legalPersonLenderResponsibleId,
  });

  await checkLegalPersonLenderResponsibleAlreadyUseEmailService({
    email,
    idToIgnore: legalPersonLenderResponsibleId,
  });

  // #endregion

  const legalPersonLender = await updateLegalPersonLenderResponsibleService({
    data: {
      name,
      email,
      CPF,
      contactPhone,
    },
    legalPersonLenderResponsibleId,
  });

  return res.status(200).json({
    legalPersonLender,
    message: 'Informações de responsável atualizadas com sucesso!',
  });
}
