import { calculateMonthlyInstallmentInterestPercentService } from './calculateMonthlyInstallmentInterestPercentService';

interface ICalculateMonthlyInstallment {
  totalValue: number;
  administrativeFee: number;
  selic: number;
  spread: number;
  paymentTermMonths: number;
}

// ValorParcelaAposCarencia = (ValorTotalDevedor /  nParcelasRestantes) + ((TaxaAdm + Selic + Spread) * ValorTotalDevedor)

export function calculateMonthlyInstallmentAfterGracePeriodCompoundInterestService({
  totalValue,
  administrativeFee,
  selic,
  spread,
  paymentTermMonths,
}: ICalculateMonthlyInstallment) {
  const monthlyInstallmentInterest = calculateMonthlyInstallmentInterestPercentService({
    administrativeFee,
    selic,
    spread,
    totalValue,
  });

  const totalValueInterest = monthlyInstallmentInterest.totalInterestPercent / 100;

  const monthlyInstallment = totalValue / paymentTermMonths + totalValue * totalValueInterest;

  return Math.round(monthlyInstallment);
}
