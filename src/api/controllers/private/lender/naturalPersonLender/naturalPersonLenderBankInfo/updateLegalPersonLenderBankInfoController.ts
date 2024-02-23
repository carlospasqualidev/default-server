import { Request, Response } from 'express';

import { checkValues } from '../../../../../utils/validator';
import {
  findNaturalPersonLenderBankInfoByIdService,
  updateNaturalPersonLenderBankInfoService,
} from '../../../../../services/lender/naturalPersonLender/naturalPersonLenderBankInfo';

interface IBody {
  naturalPersonLenderBankInfoId: string;
  account: string;
  agency: string;
  bank: string;
  receivementKey: string;
}

export async function updateNaturalPersonLenderBankInfoController(req: Request, res: Response) {
  const { naturalPersonLenderBankInfoId, account, agency, bank, receivementKey }: IBody = req.body;

  // #region VALIDATIONS
  checkValues([
    {
      label: 'ID das informações bancárias do cliente',
      type: 'string',
      value: naturalPersonLenderBankInfoId,
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

  await findNaturalPersonLenderBankInfoByIdService({ naturalPersonLenderBankInfoId });

  // #endregion

  const legalPersonLender = await updateNaturalPersonLenderBankInfoService({
    data: {
      account,
      agency,
      bank,
      receivementKey,
    },
    naturalPersonLenderBankInfoId,
  });

  return res.status(200).json({
    legalPersonLender,
    message: 'Informações bancárias atualizadas com sucesso!',
  });
}
