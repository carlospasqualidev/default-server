import { Request, Response } from 'express';
import { enums } from '../../../../../../prisma';

interface IInstallmentStatus {
  label: string;
  value: enums.ContractInstallmentStatus;
}

export async function findManyContractInstallmentStatusController(_req: Request, res: Response) {
  const installmentStatus: IInstallmentStatus[] = [
    {
      label: 'Em aberto',
      value: 'open',
    },
    {
      label: 'Em atraso',
      value: 'overdue',
    },
    {
      label: 'Recebido',
      value: 'received',
    },
  ];

  return res.status(200).json({ installmentStatus });
}
