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
  reducedPrincipal?: number;
  oneTimePaymentAmount?: number;
}

export const calculateMortgage = (inputs: LoanInputs): MortgageResults | null => {
  let { loanAmount, interestRate, loanTermYears, extraPayment, paymentType } = inputs;
  
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTermYears * 12;

  if (loanAmount <= 0 || monthlyRate <= 0 || totalPayments <= 0) {
    return null;
  }

  // Calculate regular monthly payment (P&I only)
  const monthlyPaymentRegular = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                                (Math.pow(1 + monthlyRate, totalPayments) - 1);
  
  // Handle case where extra payment covers entire loan
  if (extraPayment >= loanAmount) {
    return {
      monthlyPayment: monthlyPaymentRegular,
      monthlyPaymentRegular,
      monthlyPaymentExtra: 0,
      totalInterestRegular: (monthlyPaymentRegular * totalPayments) - loanAmount,
      totalAmountRegular: loanAmount + ((monthlyPaymentRegular * totalPayments) - loanAmount),
      totalInterestExtra: 0,
      totalAmountExtra: extraPayment,
      interestSavings: (monthlyPaymentRegular * totalPayments) - loanAmount,
      timeSavings: { years: loanTermYears, months: 0 },
      paymentsWithExtra: 0,
      totalPayments,
      reducedPrincipal: 0,
      oneTimePaymentAmount: extraPayment
    };
  }

  // If no extra payment, return regular calculation
  if (extraPayment <= 0) {
    const totalInterestRegular = (monthlyPaymentRegular * totalPayments) - loanAmount;
    return {
      monthlyPayment: monthlyPaymentRegular,
      monthlyPaymentRegular,
      monthlyPaymentExtra: monthlyPaymentRegular,
      totalInterestRegular,
      totalAmountRegular: loanAmount + totalInterestRegular,
      totalInterestExtra: totalInterestRegular,
      totalAmountExtra: loanAmount + totalInterestRegular,
      interestSavings: 0,
      timeSavings: { years: 0, months: 0 },
      paymentsWithExtra: totalPayments,
      totalPayments,
      reducedPrincipal: paymentType === 'oneTime' ? loanAmount : undefined,
      oneTimePaymentAmount: paymentType === 'oneTime' ? 0 : undefined
    };
  }

  // amortization simulation
  function simulateAmortization(
    principal: number, 
    monthlyPayment: number, 
    monthlyRate: number,
    extraMonthlyPayment: number = 0
  ): { payments: number, totalInterest: number } {
    let balance = principal;
    let totalInterest = 0;
    let paymentCount = 0;
    const maxPayments = totalPayments * 2; // Safety limit

    while (balance > 0.01 && paymentCount < maxPayments) {
      paymentCount++;
      
      // Calculate this month's interest
      const interestPayment = balance * monthlyRate;
      totalInterest += interestPayment;
      
      // Calculate principal portion of regular payment
      const principalFromRegularPayment = monthlyPayment - interestPayment;
      
      // Total principal payment (regular + extra)
      let totalPrincipalPayment = principalFromRegularPayment + extraMonthlyPayment;
      
      // Can't pay more than remaining balance
      if (totalPrincipalPayment > balance) {
        totalPrincipalPayment = balance;
      }
      
      // If regular payment doesn't even cover interest, loan is problematic
      if (principalFromRegularPayment <= 0 && balance > 0.01) {
        // This means the payment is too small to cover interest
        break;
      }
      
      // Apply principal payment
      balance -= totalPrincipalPayment;
      
      // Round to avoid floating point precision issues
      balance = Math.round(balance * 100) / 100;
    }
    
    return { 
      payments: paymentCount, 
      totalInterest: Math.round(totalInterest * 100) / 100 
    };
  }

  // Calculate regular loan scenario
  const regularLoan = simulateAmortization(loanAmount, monthlyPaymentRegular, monthlyRate, 0);
  
  // Calculate loan with extra payments
  let loanWithExtra;
  if (paymentType === 'oneTime') {
    // Apply one-time payment to principal immediately, then simulate with regular payments
    const reducedPrincipal = loanAmount - extraPayment;
    loanWithExtra = simulateAmortization(reducedPrincipal, monthlyPaymentRegular, monthlyRate, 0);
  } else {
    // Apply extra payment monthly
    loanWithExtra = simulateAmortization(loanAmount, monthlyPaymentRegular, monthlyRate, extraPayment);
  }

  const paymentsWithExtra = loanWithExtra.payments;
  const totalInterestExtra = loanWithExtra.totalInterest;
  
  // Calculate total amount paid
  let totalAmountExtra: number;
  if (paymentType === 'oneTime') {
    // One-time payment + all monthly payments made
    totalAmountExtra = extraPayment + (monthlyPaymentRegular * paymentsWithExtra);
  } else {
    // Monthly payments with extra amount
    totalAmountExtra = (monthlyPaymentRegular + extraPayment) * paymentsWithExtra;
  }

  // Calculate savings
  const interestSavings = Math.max(0, regularLoan.totalInterest - totalInterestExtra);
  const timeSavingsMonths = Math.max(0, regularLoan.payments - paymentsWithExtra);
  const yearsSaved = Math.floor(timeSavingsMonths / 12);
  const monthsSaved = timeSavingsMonths % 12;

  // Monthly payment for display purposes
  const monthlyPaymentExtra = paymentType === 'oneTime' 
    ? monthlyPaymentRegular 
    : monthlyPaymentRegular + extraPayment;

  return {
    monthlyPayment: monthlyPaymentRegular,
    monthlyPaymentRegular,
    monthlyPaymentExtra,
    totalInterestRegular: regularLoan.totalInterest,
    totalAmountRegular: loanAmount + regularLoan.totalInterest,
    totalInterestExtra,
    totalAmountExtra,
    interestSavings,
    timeSavings: { years: yearsSaved, months: monthsSaved },
    paymentsWithExtra,
    totalPayments: regularLoan.payments,
    reducedPrincipal: paymentType === 'oneTime' ? loanAmount - extraPayment : undefined,
    oneTimePaymentAmount: paymentType === 'oneTime' ? extraPayment : undefined
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