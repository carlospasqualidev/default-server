import { Request, Response } from 'express';

import { checkValues } from '../../../../../utils/validator';
import {
  findLegalPersonBorrowerBankInfoByIdService,
  updateLegalPersonBorrowerBankInfoService,
} from '../../../../../services/borrower/legalPersonBorrower/legalPersonBorrowerBankInfo';

interface IBody {
  legalPersonBorrowerBankInfoId: string;
  account: string;
  agency: string;
  bank: string;
  receivementKey: string;
}

export async function updateLegalPersonBorrowerBankInfoController(req: Request, res: Response) {
  const { legalPersonBorrowerBankInfoId, account, agency, bank, receivementKey }: IBody = req.body;

  // #region VALIDATIONS
  checkValues([
    {
      label: 'ID das informações bancárias do devedor',
      type: 'string',
      value: legalPersonBorrowerBankInfoId,
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

  await findLegalPersonBorrowerBankInfoByIdService({ legalPersonBorrowerBankInfoId });

  // #endregion

  const legalPersonBorrower = await updateLegalPersonBorrowerBankInfoService({
    data: {
      account,
      agency,
      bank,
      receivementKey,
    },
    legalPersonBorrowerBankInfoId,
  });

  return res.status(200).json({
    legalPersonBorrower,
    message: 'Informações bancárias atualizadas com sucesso!',
  });
}
