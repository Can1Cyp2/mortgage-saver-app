// Types
export interface LoanInputs {
  loanAmount: number;
  interestRate: number;
  loanTermYears: number;
  extraPayment: number;
  paymentType: 'oneTime' | 'monthly';
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
  paymentsWithExtra: number;
  totalPayments: number;
}

export interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  prefix?: string;
  keyboardType?: 'numeric' | 'default';
}

export interface ResultCardProps {
  title: string;
  value: string;
  subtitle?: string;
  color?: string;
  icon?: string;
}

export interface LoanComparisonProps {
  results: MortgageResults;
  hasExtraPayment: boolean;
}


export const calculateMortgage = (inputs: LoanInputs): MortgageResults | null => {
  let { loanAmount, interestRate, loanTermYears, extraPayment, paymentType } = inputs;
  
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTermYears * 12;

  if (loanAmount <= 0 || monthlyRate <= 0 || totalPayments <= 0) {
    return null;
  }

  // Calculate regular monthly payment and totals (without any extra payments)
  const monthlyPaymentRegular = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                                (Math.pow(1 + monthlyRate, totalPayments) - 1);
  const totalInterestRegular = (monthlyPaymentRegular * totalPayments) - loanAmount;
  const totalAmountRegular = loanAmount + totalInterestRegular;

  // Calculate with extra payments
  let balanceExtra = loanAmount;
  let totalInterestExtra = 0;
  let paymentsWithExtra = 0;
  let monthlyPaymentExtraCalculated: number;
  let totalAmountExtra: number;

  if (paymentType === 'oneTime') {
    // Option A: Same Term, Recalculated Payment
    const adjustedLoanAmount = Math.max(0, loanAmount - extraPayment);

    if (adjustedLoanAmount === 0) {
      monthlyPaymentExtraCalculated = 0;
      balanceExtra = 0;
      totalInterestExtra = 0;
      paymentsWithExtra = 0;
    } else if (adjustedLoanAmount < 0.01) { // Handle very small amounts
      monthlyPaymentExtraCalculated = adjustedLoanAmount;
      totalInterestExtra = 0;
      paymentsWithExtra = 1;
      balanceExtra = 0;
    } else {
      monthlyPaymentExtraCalculated = adjustedLoanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
                                      (Math.pow(1 + monthlyRate, totalPayments) - 1);

      balanceExtra = adjustedLoanAmount;
      totalInterestExtra = 0;
      paymentsWithExtra = 0;

      // Simulate payments with the newly adjusted monthly payment
      while (balanceExtra > 0.01 && paymentsWithExtra < totalPayments * 2) { // Safety checks
        const interestPayment = balanceExtra * monthlyRate;
        const principalPayment = monthlyPaymentExtraCalculated - interestPayment;
        const actualPrincipalPaid = Math.min(principalPayment, balanceExtra);

        totalInterestExtra += interestPayment;
        balanceExtra -= actualPrincipalPaid;
        paymentsWithExtra++;
      }
    }
    
    // For one-time payments, total includes the extra payment
    totalAmountExtra = loanAmount + extraPayment + totalInterestExtra;
  } else { // paymentType === 'monthly'
    // Simulate payments with regular monthly payment + extra monthly payment
    monthlyPaymentExtraCalculated = monthlyPaymentRegular + extraPayment;
    balanceExtra = loanAmount;
    totalInterestExtra = 0;
    paymentsWithExtra = 0;

    while (balanceExtra > 0.01 && paymentsWithExtra < totalPayments * 2) { // Safety checks
      const interestPayment = balanceExtra * monthlyRate;
      const principalPayment = monthlyPaymentExtraCalculated - interestPayment;
      const actualPrincipalPaid = Math.min(principalPayment, balanceExtra);

      totalInterestExtra += interestPayment;
      balanceExtra -= actualPrincipalPaid;
      paymentsWithExtra++;
    }
    
    // For monthly payments, total is principal + interest (extra payments are part of the payment stream)
    totalAmountExtra = loanAmount + totalInterestExtra;
  }

  const interestSavings = totalInterestRegular - totalInterestExtra;
  const timeSavings = Math.max(0, totalPayments - paymentsWithExtra);
  const yearsSaved = Math.floor(timeSavings / 12);
  const monthsSaved = timeSavings % 12;

  return {
    monthlyPayment: monthlyPaymentRegular, // Base monthly payment
    monthlyPaymentRegular,
    monthlyPaymentExtra: monthlyPaymentExtraCalculated,
    totalInterestRegular,
    totalAmountRegular,
    totalInterestExtra,
    totalAmountExtra,
    interestSavings,
    timeSavings: { years: yearsSaved, months: monthsSaved },
    paymentsWithExtra,
    totalPayments
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const validateNumericInput = (value: string): boolean => {
  const cleaned = value.replace(/[^\d.]/g, '');
  const num = parseFloat(cleaned);
  return !isNaN(num) && num >= 0;
};