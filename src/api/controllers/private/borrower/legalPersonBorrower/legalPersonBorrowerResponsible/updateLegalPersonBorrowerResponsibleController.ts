import { Request, Response } from 'express';

import { checkValues } from '../../../../../utils/validator';
import {
  checkLegalPersonBorrowerResponsibleAlreadyUseCPFService,
  checkLegalPersonBorrowerResponsibleAlreadyUseEmailService,
  findLegalPersonBorrowerResponsibleByIdService,
  updateLegalPersonBorrowerResponsibleService,
} from '../../../../../services/borrower/legalPersonBorrower/legalPersonBorrowerReponsible';

interface IBody {
  legalPersonBorrowerResponsibleId: string;
  name: string;
  email: string;
  CPF: string;
  contactPhone: string;
}

export async function updateLegalPersonBorrowerResponsibleController(req: Request, res: Response) {
  const { legalPersonBorrowerResponsibleId, CPF, contactPhone, email, name }: IBody = req.body;

  // #region VALIDATIONS
  checkValues([
    {
      label: 'ID do responsável',
      type: 'string',
      value: legalPersonBorrowerResponsibleId,
    },
  ]);

  await findLegalPersonBorrowerResponsibleByIdService({ legalPersonBorrowerResponsibleId });

  await checkLegalPersonBorrowerResponsibleAlreadyUseCPFService({
    CPF,
    idToIgnore: legalPersonBorrowerResponsibleId,
  });

  await checkLegalPersonBorrowerResponsibleAlreadyUseEmailService({
    email,
    idToIgnore: legalPersonBorrowerResponsibleId,
  });

  // #endregion

  const legalPersonBorrower = await updateLegalPersonBorrowerResponsibleService({
    data: {
      name,
      email,
      CPF,
      contactPhone,
    },
    legalPersonBorrowerResponsibleId,
  });

  return res.status(200).json({
    legalPersonBorrower,
    message: 'Informações de responsável atualizadas com sucesso!',
  });
}
