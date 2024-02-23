import { Request, Response } from 'express';
import { checkValues } from '../../../../utils/validator';
import { findContractByIdService } from '../../../../services/contract/contract';
import { createContractAnnexService } from '../../../../services/contract/contractAnnex';

interface IBody {
  contractId: string;
  annexes: {
    name: string;
    url: string;
  }[];
}

export async function createContractAnnexController(req: Request, res: Response) {
  const { contractId, annexes }: IBody = req.body;

  // #region VALIDATIONS

  checkValues([
    {
      value: contractId,
      label: 'ID do contrato',
      type: 'string',
    },
  ]);

  for (let i = 0; i < annexes.length; i++) {
    const annex = annexes[i];

    checkValues([
      {
        value: annex.name,
        label: 'Nome do anexo',
        type: 'string',
      },
      {
        value: annex.url,
        label: 'URL do anexo',
        type: 'string',
      },
    ]);
  }

  await findContractByIdService({ contractId });
  // #endregion

  const contractAnnexes = await createContractAnnexService({
    data: annexes.map((annex) => ({
      contractId,
      name: annex.name,
      url: annex.url,
    })),
  });

  return res.status(201).json({
    contractAnnexes,
    message: 'Anexos cadastrados com sucesso!',
  });
}
