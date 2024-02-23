import { addMonths } from '../../../utils/dateTime';
import { mask } from '../../../utils/masks';
import { calculateMonthlyInstallmentInterestPercentService } from './calculates';

interface IGenerateInstallmentFixedInterestService {
  contractId: string;
  totalValue: number;
  paymentStartDate: Date;
  paymentTermMonths: number;
  gracePeriodPaymentMonths: number;
  administrativeFee: number;
  selic: number;
  spread: number;
}

// ValorParcelaAposCarencia = (ValorTotalDevedor /  nParcelasRestantes) + ((TaxaAdm + Selic + Spread) * ValorTotalDevedor)
export function generateContractInstallmentCompoundInterestService({
  contractId,
  administrativeFee,
  paymentStartDate,
  gracePeriodPaymentMonths,
  paymentTermMonths,
  selic,
  spread,
  totalValue,
}: IGenerateInstallmentFixedInterestService) {
  const totalMonthlyInstallment = paymentTermMonths + gracePeriodPaymentMonths;
  let dueDate = new Date(paymentStartDate);

  const monthlyInstallments = [];
  let currentTotalValue = totalValue;
  let currentPaymentTermMonths = paymentTermMonths;

  for (let i = 0; i < totalMonthlyInstallment; i++) {
    const monthlyInstallmentInterestData = calculateMonthlyInstallmentInterestPercentService({
      administrativeFee,
      selic,
      spread,
      totalValue: currentTotalValue,
    });

    // #region GRACE PERIOD - PERIODO DE CARENCIA
    if (i < gracePeriodPaymentMonths) {
      monthlyInstallments.push({
        contractId,
        installmentNumber: i + 1,
        totalValue: monthlyInstallmentInterestData.totalInterestValue,
        maskedTotalValue: monthlyInstallmentInterestData.maskedtotalInterestValue,
        dueDate,
        amortizedValue: 0,
        maskedAmortizedValue: mask({ value: '0', type: 'BRL' }),
        gracePeriod: true,
        ...monthlyInstallmentInterestData,
      });

      dueDate = addMonths({ date: dueDate, months: 1 });

      continue;
    }
    // #endregion

    // #region region AFTER GRACE PERIOD - APÓS O PERIODO DE CARENCIA

    const amortizedValue = Math.round(currentTotalValue / currentPaymentTermMonths);

    const monthlyInstallmentResult =
      monthlyInstallmentInterestData.totalInterestValue + amortizedValue;

    const maskedMonthlyInstallmentResult = mask({
      value: String(monthlyInstallmentResult),
      type: 'BRL',
    });

    monthlyInstallments.push({
      contractId,
      installmentNumber: i + 1,
      totalValue: monthlyInstallmentResult,
      maskedTotalValue: maskedMonthlyInstallmentResult,
      dueDate,
      amortizedValue,
      maskedAmortizedValue: mask({ value: String(amortizedValue), type: 'BRL' }),
      gracePeriod: false,
      ...monthlyInstallmentInterestData,
    });

    // #endregion

    currentTotalValue = Math.round(currentTotalValue - amortizedValue);
    currentPaymentTermMonths -= 1;
    dueDate = addMonths({ date: dueDate, months: 1 });
  }

  return monthlyInstallments;
}
