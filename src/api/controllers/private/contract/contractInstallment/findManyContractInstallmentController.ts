import { Request, Response } from 'express';
import { handleQueryFilterService } from '../../../../utils/dataHandler';
import { findManyContractInstallmentService } from '../../../../services/contract/contractInstallments';
import { enums } from '../../../../../../prisma';

interface IJSONFilter {
  lenders: string[];
  borrowers: string[];
  status: enums.ContractInstallmentStatus[];
  startAt: string;
  endAt: string;
}

interface IFindManyContractsController {
  page: string;
  take: string;
  JSONFilter?: string;
}
export async function findManyContractInstallmentController(req: Request, res: Response) {
  const query = req.query as any as IFindManyContractsController;
  const JSONFilter: IJSONFilter = query?.JSONFilter && JSON.parse(query?.JSONFilter);

  // #region VALIDATIONS
  const { page, take, startAt, endAt } = handleQueryFilterService({
    page: query.page,
    take: query.take,
    startAt: JSONFilter.startAt,
    endAt: JSONFilter.endAt,
  });

  // #endregion

  const { installments, count } = await findManyContractInstallmentService({
    page,
    take,
    startAt,
    endAt,
    status: JSONFilter.status,
    borrowers: JSONFilter.borrowers,
    lenders: JSONFilter.lenders,
  });

  return res.status(200).json({ installments, count });
}
