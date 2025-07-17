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
  };
  hasExtraPayment: boolean;
}

export interface MortgageResults {
  monthlyPayment: number;
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