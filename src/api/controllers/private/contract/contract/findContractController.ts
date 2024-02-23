import { Request, Response } from 'express';

import { checkValues } from '../../../../utils/validator';
import { findContractByIdService } from '../../../../services/contract/contract';
import { enums } from '../../../../../../prisma';

interface IParams {
  contractId: string;
}

interface IBorrower {
  clientType: enums.ClientType;
  legalPersonBorrower: {
    id: string;
    CNPJ: string;
    name: string;
    email: string;
    contactPhone: string;
  } | null;
  naturalPersonBorrower: {
    id: string;
    CPF: string;
    name: string;
    email: string;
    contactPhone: string;
  } | null;
}

interface ILenders {
  clientType: enums.ClientType;
  maskedValue: string;
  value: number;
  legalPersonLender: {
    id: string;
    name: string;
    CNPJ: string;
    email: string;
  } | null;

  naturalPersonLender: {
    id: string;
    name: string;
    CPF: string;
    email: string;
  } | null;
}

function handleBorrower({ borrower }: { borrower: IBorrower | null }) {
  if (!borrower) return null;

  const borrowerData = {
    legalPerson: borrower?.legalPersonBorrower,
    naturalPerson: borrower?.naturalPersonBorrower,
  };

  return { ...borrowerData[borrower.clientType], type: borrower.clientType };
}

function handleLenders({ lenders }: { lenders: ILenders[] | null }) {
  if (!lenders) return null;

  const lendersData = [];

  for (let i = 0; i < lenders.length; i++) {
    const lender = lenders[i];

    const lenderData = {
      legalPerson: lender?.legalPersonLender,
      naturalPerson: lender?.naturalPersonLender,
    };

    lendersData.push({
      ...lenderData[lender.clientType],
      value: lender.value,
      maskedValue: lender.maskedValue,
      type: lender.clientType,
    });
  }

  // @ts-ignore
  lendersData.sort((a, b) => a.name.localeCompare(b.name));

  return lendersData;
}

export async function findContractController(req: Request, res: Response) {
  const { contractId } = req.params as any as IParams;

  // #region VALIDATIONS

  checkValues([
    {
      value: contractId,
      label: 'ID do contrato',
      type: 'string',
    },
  ]);

  const contractData = await findContractByIdService({ contractId });
  const borrower = handleBorrower({ borrower: contractData.contractBorrower });
  const lenders = handleLenders({ lenders: contractData.contractLenders });
  const contract = {
    id: contractData.id,
    startDate: contractData.startDate,
    paymentStartDate: contractData.paymentStartDate,
    totalValue: contractData.totalValue,
    maskedTotalValue: contractData.maskedTotalValue,
    administrativeFee: contractData.administrativeFee,
    type: contractData.type,
    fee: contractData.fee,
    paymentTermMonths: contractData.paymentTermMonths,
    gracePeriodPaymentMonths: contractData.gracePeriodPaymentMonths,
    selic: contractData.selic,
    spread: contractData.spread,
    borrower,
    lenders,
    annexes: contractData.contractAnexes,
  };

  // #endregion

  return res.status(200).json({ contract });
}
