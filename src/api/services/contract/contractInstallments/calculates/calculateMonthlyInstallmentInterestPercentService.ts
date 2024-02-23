import { mask } from '../../../../utils/masks';

interface ICalculateMonthlyInstallment {
  totalValue: number;
  administrativeFee: number;
  selic: number;
  spread: number;
}

export function calculateMonthlyInstallmentInterestPercentService({
  totalValue,
  administrativeFee,
  selic,
  spread,
}: ICalculateMonthlyInstallment) {
  const administrativeFeeValue = Math.round((administrativeFee * totalValue) / 100);
  const selicValue = Math.round((selic * totalValue) / 100);
  const spreadValue = Math.round((spread * totalValue) / 100);
  const totalInterestValue = Math.round(administrativeFeeValue + selicValue + spreadValue);

  const interestValues = {
    administrativeFeePercent: administrativeFee,
    administrativeFeeValue,
    maskedAdministrativeFeeValue: mask({ type: 'BRL', value: String(administrativeFeeValue) }),

    selicPercent: selic,
    selicValue,
    maskedSelicValue: mask({ type: 'BRL', value: String(selicValue) }),

    spreadPercent: spread,
    spreadValue,
    maskedSpreadValue: mask({ type: 'BRL', value: String(spreadValue) }),

    totalInterestPercent: administrativeFee + selic + spread,
    totalInterestValue,
    maskedtotalInterestValue: mask({ type: 'BRL', value: String(totalInterestValue) }),
  };

  return interestValues;
}
