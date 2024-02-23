import { calculateMonthlyInstallmentInterestPercentService } from './calculateMonthlyInstallmentInterestPercentService';

interface ICalculateMonthlyInstallment {
  totalValue: number;
  administrativeFee: number;
  selic: number;
  spread: number;
  paymentTermMonths: number;
}

// ValorParcelaAposCarencia = (SaldoDevedor * (TaxaAdm + Selic + Spread)) / (1 - (1 + TaxaAdm + Selic + Spread)^(-Prazo))

export function calculateMonthlyInstallmentAfterGracePeriodFixedInterestService({
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

  const monthlyInstallment =
    (totalValue * totalValueInterest) / (1 - (1 + totalValueInterest) ** -paymentTermMonths);

  return Math.round(monthlyInstallment);
}
