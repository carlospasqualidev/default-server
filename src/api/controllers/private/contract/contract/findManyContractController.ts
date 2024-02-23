import { Request, Response } from 'express';
import { handleQueryFilterService } from '../../../../utils/dataHandler';
import { findManyContractService } from '../../../../services/contract/contract/findManyContractService';
import { enums } from '../../../../../../prisma';

interface IFindManyContractsController {
  page: string;
  take: string;
  startAt?: string;
  endAt?: string;
  filter: string | undefined;
}

interface IContracts {
  id: string;
  startDate: Date;
  paymentStartDate: Date;
  totalValue: number;
  maskedTotalValue: string;
  type: enums.ContractType;
  status: enums.ContractStatus;
  contractLenders: {
    clientType: enums.ClientType;
    naturalPersonLender: {
      name: string;
    } | null;
    legalPersonLender: {
      name: string;
    } | null;
  }[];

  contractBorrower: {
    clientType: enums.ClientType;

    naturalPersonBorrower: {
      name: string;
    } | null;

    legalPersonBorrower: {
      name: string;
    } | null;
  } | null;
}

function handleContracts({ contracts }: { contracts: IContracts[] }) {
  const contractsData = [];
  for (let i = 0; i < contracts.length; i++) {
    const contract = contracts[i];

    const isLegalPerson = contract.contractBorrower?.clientType === enums.ClientType.legalPerson;

    const borrowerName = isLegalPerson
      ? contract.contractBorrower?.legalPersonBorrower?.name
      : contract.contractBorrower?.naturalPersonBorrower?.name;

    const lenderNames = contract.contractLenders?.map((lender) => {
      if (lender.clientType === enums.ClientType.legalPerson) return lender.legalPersonLender?.name;
      return lender.naturalPersonLender?.name;
    });

    contractsData.push({
      id: contract.id,
      startDate: contract.startDate,
      paymentStartDate: contract.paymentStartDate,
      totalValue: contract.totalValue,
      maskedTotalValue: contract.maskedTotalValue,
      status: contract.status,
      type: contract.type,
      borrowerName,
      lenderNames,
    });
  }

  return contractsData;
}

export async function findManyContractController(req: Request, res: Response) {
  const query = req.query as any as IFindManyContractsController;

  // #region VALIDATIONS
  const { page, take, search, startAt, endAt } = handleQueryFilterService({
    page: query.page,
    take: query.take,
    startAt: query.startAt,
    endAt: query.endAt,
    search: query.filter,
  });
  // #endregion

  const { contractsData, count } = await findManyContractService({
    search,
    page,
    take,
    startAt,
    endAt,
  });

  const contracts = handleContracts({ contracts: contractsData });

  return res.status(200).json({ contracts, count });
}
