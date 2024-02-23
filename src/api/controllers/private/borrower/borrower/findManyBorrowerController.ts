import { Request, Response } from 'express';
import { checkIfNaN } from '../../../../utils/validator';
import { forceAbsoluteNumber } from '../../../../utils/dataHandler';
import { ErrorMessage } from '../../../../utils/error';
import { findManyBorrowerService } from '../../../../services/borrower/borrower';

interface IQuery {
  filter: string;
  page: string;
  take: string;
  search: string | undefined;
}

function handleTake(currentTake: string) {
  const take = forceAbsoluteNumber(currentTake || '20');
  if (take >= 10) return take / 2;

  throw new ErrorMessage({
    statusCode: '422 UNPROCESSABLE CONTENT',
    message: 'O número de registros deve ser no mínimo 10.',
  });
}

export async function findManyBorrowerController(req: Request, res: Response) {
  const { filter, page, take } = req.query as any as IQuery;
  // #region VALIDATIONS

  checkIfNaN([
    { label: 'Número de registros', number: take },
    { label: 'Página', number: page },
  ]);

  // #endregion

  const { borrowers, count } = await findManyBorrowerService({
    page: forceAbsoluteNumber(page || '1'),
    take: handleTake(take),
    filter,
  });

  return res.status(200).json({
    borrowers,
    count,
  });
}
