import { addMonths } from '../../../utils/dateTime';
import { mask } from '../../../utils/masks';
import {
  calculateMonthlyInstallmentAfterGracePeriodFixedInterestService,
  calculateMonthlyInstallmentInterestPercentService,
} from './calculates';

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

export function generateContractInstallmentFixedInterestService({
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

    const monthlyInstallmentResult =
      calculateMonthlyInstallmentAfterGracePeriodFixedInterestService({
        administrativeFee,
        selic,
        spread,
        totalValue,
        paymentTermMonths,
      });
    const maskedMonthlyInstallmentResult = mask({
      value: String(monthlyInstallmentResult),
      type: 'BRL',
    });

    const amortizedValue = Math.round(
      monthlyInstallmentResult - monthlyInstallmentInterestData.totalInterestValue,
    );

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
    dueDate = addMonths({ date: dueDate, months: 1 });
  }

  return monthlyInstallments;
}
