import { Request, Response } from 'express';

import { checkValues } from '../../../../../utils/validator';
import {
  findNaturalPersonBorrowerBankInfoByIdService,
  updateNaturalPersonBorrowerBankInfoService,
} from '../../../../../services/borrower/naturalPersonBorrower/naturalPersonBorrowerBankInfo';

interface IBody {
  naturalPersonBorrowerBankInfoId: string;
  account: string;
  agency: string;
  bank: string;
  receivementKey: string;
}

export async function updateNaturalPersonBorrowerBankInfoController(req: Request, res: Response) {
  const { naturalPersonBorrowerBankInfoId, account, agency, bank, receivementKey }: IBody =
    req.body;

  // #region VALIDATIONS
  checkValues([
    {
      label: 'ID das informações bancárias do devedor',
      type: 'string',
      value: naturalPersonBorrowerBankInfoId,
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

  await findNaturalPersonBorrowerBankInfoByIdService({ naturalPersonBorrowerBankInfoId });

  // #endregion

  const legalPersonBorrower = await updateNaturalPersonBorrowerBankInfoService({
    data: {
      account,
      agency,
      bank,
      receivementKey,
    },
    naturalPersonBorrowerBankInfoId,
  });

  return res.status(200).json({
    legalPersonBorrower,
    message: 'Informações bancárias atualizadas com sucesso!',
  });
}
