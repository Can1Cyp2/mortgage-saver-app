// Types
export interface LoanInputs {
  loanAmount: number;
  interestRate: number;
  loanTermYears: number;
  extraPayment: number;
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
  const { loanAmount, interestRate, loanTermYears, extraPayment } = inputs;
  
  const principal = loanAmount;
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTermYears * 12;
  const extra = extraPayment || 0;

  if (principal <= 0 || monthlyRate <= 0 || totalPayments <= 0) {
    return null;
  }

  // Calculate regular monthly payment
  const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                        (Math.pow(1 + monthlyRate, totalPayments) - 1);

  // Calculate regular loan totals
  const totalInterestRegular = (monthlyPayment * totalPayments) - principal;
  const totalAmountRegular = principal + totalInterestRegular;

  // Calculate with extra payments
  let balance = principal;
  let totalInterestExtra = 0;
  let paymentsWithExtra = 0;

  while (balance > 0 && paymentsWithExtra < totalPayments) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    const totalPrincipalPayment = Math.min(principalPayment + extra, balance);

    totalInterestExtra += interestPayment;
    balance -= totalPrincipalPayment;
    paymentsWithExtra++;
  }

  const totalAmountExtra = principal + totalInterestExtra;
  const interestSavings = totalInterestRegular - totalInterestExtra;
  const timeSavings = totalPayments - paymentsWithExtra;
  const yearsSaved = Math.floor(timeSavings / 12);
  const monthsSaved = timeSavings % 12;

  return {
    monthlyPayment,
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