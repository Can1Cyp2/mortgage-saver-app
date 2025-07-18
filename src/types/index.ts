export interface LoanComparisonProps {
  results: {
    totalInterestRegular: number;
    totalInterestExtra: number;
    totalAmountRegular: number;
    totalAmountExtra: number;
    interestSavings: number;
    timeSavings: {
      years: number;
      months: number;
    };
    monthlyPaymentRegular: number;
    monthlyPaymentExtra: number;
  };
  extraPaymentType?: PaymentType;
}

export interface MortgageResults {
  monthlyPayment: number;
  monthlyPaymentRegular: number;
  monthlyPaymentExtra: number;
  totalInterestRegular: number;
  totalAmountRegular: number;
  totalInterestExtra: number;
  totalAmountExtra: number;
  interestSavings: number;
  timeSavings: {
    years: number;
    months: number;
  };
}

export type PaymentType = 'oneTime' | 'monthly';