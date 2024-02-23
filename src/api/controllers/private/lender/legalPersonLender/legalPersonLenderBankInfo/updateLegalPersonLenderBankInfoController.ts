import { Request, Response } from 'express';

import { checkValues } from '../../../../../utils/validator';
import {
  findLegalPersonLenderBankInfoByIdService,
  updateLegalPersonLenderBankInfoService,
} from '../../../../../services/lender/legalPersonLender/legalPersonLenderBankInfo';

interface IBody {
  legalPersonLenderBankInfoId: string;
  account: string;
  agency: string;
  bank: string;
  receivementKey: string;
}

export async function updateLegalPersonLenderBankInfoController(req: Request, res: Response) {
  const { legalPersonLenderBankInfoId, account, agency, bank, receivementKey }: IBody = req.body;

  // #region VALIDATIONS
  checkValues([
    {
      label: 'ID das informações bancárias do cliente',
      type: 'string',
      value: legalPersonLenderBankInfoId,
    },
    {
      label: 'conta',
      type: 'string',
      value: account,
    },
    {
      label: 'agência',
      type: 'string',
      value: agency,
    },
    {
      label: 'banco',
      type: 'string',
      value: bank,
    },
    {
      label: 'chave de recebimento',
      type: 'string',
      value: receivementKey,
    },
  ]);

  await findLegalPersonLenderBankInfoByIdService({ legalPersonLenderBankInfoId });

  // #endregion

  const legalPersonLender = await updateLegalPersonLenderBankInfoService({
    data: {
      account,
      agency,
      bank,
      receivementKey,
    },
    legalPersonLenderBankInfoId,
  });

  return res.status(200).json({
    legalPersonLender,
    message: 'Informações bancárias atualizadas com sucesso!',
  });
}
