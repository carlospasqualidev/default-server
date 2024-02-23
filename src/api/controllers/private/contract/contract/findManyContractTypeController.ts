import { Request, Response } from 'express';
import { enums } from '../../../../../../prisma';

const contractTypesLabels: {
  [key: string]: string;
} = {
  fixedInterest: 'Juros fixos',
  compoundInterest: 'Juros sobre saldo devedor',
};

export async function findManyContractTypeController(_req: Request, res: Response) {
  const contractTypes = Object.keys(enums.ContractType).map((name: string) => ({
    name,
    label: contractTypesLabels[name],
  }));

  return res.status(200).json({
    contractTypes,
  });
}
