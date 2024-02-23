import { Request, Response } from 'express';
import { checkEnums, checkValues } from '../../../../utils/validator';
import {
  findContractByIdService,
  updateContractService,
} from '../../../../services/contract/contract';
import { mask } from '../../../../utils/masks';
import { enums } from '../../../../../../prisma';
import { ErrorMessage } from '../../../../utils/error';
import { findLegalPersonBorrowerByIdService } from '../../../../services/borrower/legalPersonBorrower/legalPersonBorrower';
import { findNaturalPersonLenderByIdService } from '../../../../services/lender/naturalPersonLender/naturalPersonLender';
import { findLegalPersonLenderByIdService } from '../../../../services/lender/legalPersonLender/legalPersonLender';
import { findNaturalPersonBorrowerByIdService } from '../../../../services/borrower/naturalPersonBorrower/naturalPersonBorrower';

import { setToUTCMidnight } from '../../../../utils/dateTime';

interface IBorrower {
  id: string;
  type: enums.ClientType;
}

interface ILenders extends IBorrower {
  value: number;
}

interface IBody {
  contractId: string;
  startDate: Date;
  paymentStartDate: Date;
  type: enums.ContractType;
  totalValue: number;
  paymentTermMonths: number; // Prazo de pagamento
  gracePeriodPaymentMonths: number; // Meses de carência
  administrativeFee: number; // Taxa administrativa
  spread: number;
  selic: number; // Selic Copom atual
  fee: number; // valor pelos serviços da Jazz em cima do contrato

  borrower: IBorrower;
  lenders: ILenders[];
}

interface ILendersForCreate {
  legalPersonLenderId?: string;
  naturalPersonLenderId?: string;
  value: number;
  maskedValue: string;
  clientType: enums.ClientType;
}

function handleBorrower({ borrower }: { borrower: IBorrower }) {
  const borrowerData = {
    legalPerson: {
      legalPersonBorrowerId: borrower.id,
      clientType: enums.ClientType.legalPerson,
    },

    naturalPerson: {
      naturalPersonBorrowerId: borrower.id,
      clientType: enums.ClientType.naturalPerson,
    },
  };

  return borrowerData[borrower.type];
}

function handleLenders({ lenders }: { lenders: ILenders[] }) {
  const lendersForCreate: ILendersForCreate[] = [];
  let totalValue = 0;

  for (let i = 0; i < lenders.length; i++) {
    const lender = lenders[i];

    const lenderData = {
      legalPerson: {
        legalPersonLenderId: lender.id,
        value: lender.value,
        maskedValue: mask({ value: String(lender.value), type: 'BRL' }),
        clientType: enums.ClientType.legalPerson,
      },

      naturalPerson: {
        naturalPersonLenderId: lender.id,
        value: lender.value,
        maskedValue: mask({ value: String(lender.value), type: 'BRL' }),
        clientType: enums.ClientType.naturalPerson,
      },
    };

    totalValue += lender.value;

    const lenderType = lenderData[lender.type];

    const lenderFound = lendersForCreate.find(({ legalPersonLenderId, naturalPersonLenderId }) => {
      if (lenderType.clientType === enums.ClientType.legalPerson) {
        return legalPersonLenderId === lenderType.legalPersonLenderId;
      }

      if (lenderType.clientType === enums.ClientType.naturalPerson) {
        return naturalPersonLenderId === lenderType.naturalPersonLenderId;
      }

      return false;
    });

    if (lenderFound) {
      throw new ErrorMessage({
        statusCode: '422 UNPROCESSABLE CONTENT',
        message: 'Credor ja cadastrado no contrato. Verifique os valores e tente novamente.',
      });
    }

    lendersForCreate.push(lenderType);
  }

  return { lendersForCreate, totalValue };
}

export async function updateContractController(req: Request, res: Response) {
  const {
    contractId,
    startDate,
    paymentStartDate,
    paymentTermMonths,
    gracePeriodPaymentMonths,
    administrativeFee,
    fee,
    selic,
    spread,
    type,
    borrower,
    lenders,
  }: IBody = req.body;

  // #region VALIDATIONS
  checkValues([
    {
      value: contractId,
      label: 'ID do contrato',
      type: 'string',
    },
    {
      label: 'Data de início do contrato',
      type: 'date',
      value: startDate,
    },
    {
      label: 'Data de início do pagamento',
      type: 'date',
      value: paymentStartDate,
    },
    {
      label: 'Prazo de pagamento (meses)',
      type: 'float',
      value: paymentTermMonths,
    },
    {
      label: 'Carencia (meses)',
      type: 'int',
      value: gracePeriodPaymentMonths,
    },
    {
      label: 'Tipo de contrato',
      type: 'string',
      value: type,
    },

    {
      label: 'Taxa administrativa (%)',
      type: 'float',
      value: administrativeFee,
    },
    {
      label: 'Spread (%)',
      type: 'float',
      value: fee,
    },
    {
      label: 'Fee (%)',
      type: 'float',
      value: selic,
    },
    {
      label: 'Selic (%)',
      type: 'float',
      value: spread,
    },
  ]);

  await findContractByIdService({ contractId });

  // #region BORROWER
  if (!borrower) {
    throw new ErrorMessage({
      statusCode: '422 UNPROCESSABLE CONTENT',
      message: 'Verifique o valor da informação devedor e tente novamente.',
    });
  }

  checkEnums([
    {
      enums: enums.ClientType,
      label: 'Tipo do cliente',
      value: borrower.type,
    },
  ]);

  checkValues([
    {
      value: borrower.id,
      label: 'ID do cliente',
      type: 'string',
    },
    {
      value: borrower.type,
      label: 'Tipo do cliente',
      type: 'string',
    },
  ]);

  if (borrower.type === 'legalPerson') {
    await findLegalPersonBorrowerByIdService({ legalPersonBorrowerId: borrower.id });
  }

  if (borrower.type === 'naturalPerson') {
    await findNaturalPersonBorrowerByIdService({ naturalPersonBorrowerId: borrower.id });
  }

  // #endregion

  // #region LENDERS
  if (!lenders || !lenders.length) {
    throw new ErrorMessage({
      statusCode: '422 UNPROCESSABLE CONTENT',
      message: 'Verifique o valor da informação credores e tente novamente.',
    });
  }

  for (let i = 0; i < lenders.length; i++) {
    const lender = lenders[i];

    checkEnums([
      {
        enums: enums.ClientType,
        label: 'Tipo do cliente',
        value: borrower.type,
      },
    ]);

    checkValues([
      {
        value: lender.id,
        label: 'ID do credor',
        type: 'string',
      },
      {
        value: lender.type,
        label: 'Tipo do credor',
        type: 'string',
      },
      {
        value: lender.value,
        label: 'Valor do credor',
        type: 'float',
      },
    ]);

    if (lender.type === 'legalPerson') {
      await findLegalPersonLenderByIdService({ legalPersonLenderId: lender.id });
    }

    if (lender.type === 'naturalPerson') {
      await findNaturalPersonLenderByIdService({ naturalPersonLenderId: lender.id });
    }
  }

  // #endregion

  // #endregion

  const borrowerForCreate = handleBorrower({ borrower });
  const { lendersForCreate, totalValue } = handleLenders({ lenders });

  const contract = await updateContractService({
    data: {
      contractBorrower: {
        create: borrowerForCreate,
      },
      contractLenders: {
        createMany: {
          data: lendersForCreate,
        },
      },
      startDate: setToUTCMidnight(new Date(startDate)),
      paymentStartDate: setToUTCMidnight(new Date(paymentStartDate)),
      type,
      totalValue,
      maskedTotalValue: mask({ value: String(totalValue), type: 'BRL' }),
      paymentTermMonths,
      gracePeriodPaymentMonths,
      administrativeFee,
      spread,
      selic,
      fee,
    },
    contractId,
  });

  return res.status(200).json({
    contract,
    message: 'Contrato atualizado com sucesso!',
  });
}
