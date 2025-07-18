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

  // Calculate with extra payments (one-time or monthly recurring)
  let balanceExtra = loanAmount;
  let totalInterestExtra = 0;
  let paymentsWithExtra = 0;

  // Apply one-time payment at the start of the extra payment scenario
  if (paymentType === 'oneTime' && extraPayment > 0) {
    balanceExtra -= extraPayment;
  }

  const effectiveMonthlyExtraPayment = (paymentType === 'monthly') ? extraPayment : 0;

  // Recalculate monthly payment based on potentially reduced principal for extra payment scenario
  // This is crucial if a one-time payment significantly reduces the principal
  const monthlyPaymentForExtra = balanceExtra * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                                 (Math.pow(1 + monthlyRate, totalPayments) - 1);

  while (balanceExtra > 0 && paymentsWithExtra < totalPayments) {
    const interestPayment = balanceExtra * monthlyRate;
    const principalPayment = monthlyPaymentForExtra - interestPayment;
    const totalPrincipalPayment = Math.min(principalPayment + effectiveMonthlyExtraPayment, balanceExtra);

    totalInterestExtra += interestPayment;
    balanceExtra -= totalPrincipalPayment;
    paymentsWithExtra++;
  }

  const totalAmountExtra = loanAmount + totalInterestExtra; // Use original loanAmount for total
  const interestSavings = totalInterestRegular - totalInterestExtra;
  const timeSavings = totalPayments - paymentsWithExtra;
  const yearsSaved = Math.floor(timeSavings / 12);
  const monthsSaved = timeSavings % 12;

  return {
    monthlyPayment: monthlyPaymentRegular,
    monthlyPaymentRegular,
    monthlyPaymentExtra: paymentType === 'oneTime' ? monthlyPaymentRegular + extraPayment : monthlyPaymentRegular + effectiveMonthlyExtraPayment,
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