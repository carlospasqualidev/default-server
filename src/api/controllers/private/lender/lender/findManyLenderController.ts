import { Request, Response } from 'express';
import { checkIfNaN } from '../../../../utils/validator';
import { findManyLenderService } from '../../../../services/lender/lender';
import { forceAbsoluteNumber } from '../../../../utils/dataHandler';
import { ErrorMessage } from '../../../../utils/error';

interface IQuery {
  filter: string;
  page: string;
  take: string;
}

function handleTake(currentTake: string) {
  const take = forceAbsoluteNumber(currentTake || '20');
  if (take >= 10) return take / 2;

  throw new ErrorMessage({
    statusCode: '422 UNPROCESSABLE CONTENT',
    message: 'O número de registros deve ser no mínimo 10.',
  });
}

export async function findManyLenderController(req: Request, res: Response) {
  const { filter, page, take } = req.query as any as IQuery;
  // #region VALIDATIONS

  checkIfNaN([
    { label: 'Número de registros', number: take },
    { label: 'Página', number: page },
  ]);

  // #endregion

  const { count, lenders } = await findManyLenderService({
    page: forceAbsoluteNumber(page || '1'),
    take: handleTake(take),
    filter,
  });

  return res.status(200).json({
    count,
    lenders,
  });
}
