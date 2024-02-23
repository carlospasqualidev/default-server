import { Request, Response } from 'express';
import { checkValues } from '../../../../utils/validator';
import {
  fakeDeleteContractService,
  findContractByIdService,
} from '../../../../services/contract/contract';

interface IParams {
  contractId: string;
}

export async function fakeDeleteContractController(req: Request, res: Response) {
  const { contractId } = req.params as any as IParams;

  // #region VALIDATIONS
  checkValues([
    {
      label: 'ID do contrato',
      type: 'string',
      value: contractId,
    },
  ]);

  await findContractByIdService({ contractId });

  // #endregion

  await fakeDeleteContractService({
    contractId,
  });

  return res.status(200).json({
    message: 'Contrato excluído com sucesso!',
  });
}
