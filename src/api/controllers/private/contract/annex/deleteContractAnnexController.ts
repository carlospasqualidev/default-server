import { Request, Response } from 'express';
import { checkValues } from '../../../../utils/validator';
import { deleteContractAnnexService } from '../../../../services/contract/contractAnnex';

interface IParams {
  contractAnnexId: string;
}

export async function deleteContractAnnexController(req: Request, res: Response) {
  const { contractAnnexId } = req.params as any as IParams;

  // #region VALIDATIONS
  checkValues([
    {
      label: 'ID do anexo',
      type: 'string',
      value: contractAnnexId,
    },
  ]);

  // #endregion

  await deleteContractAnnexService({
    contractAnnexId,
  });

  return res.status(200).json({
    message: 'Anexo excluído com sucesso!',
  });
}
