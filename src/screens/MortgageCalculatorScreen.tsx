import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import InputField from '@/components/InputField';
import ResultCard from '@/components/ResultCard';
import LoanComparison from '@/components/LoanComparison';
import InfoButton from '@/components/InfoButton';
import { Colours } from '@/constants/colours';
import { calculateMortgage, formatCurrency, validateNumericInput } from '@/utils/mortgageCalculations';
import { MortgageResults } from '@/types';

const MortgageCalculatorScreen: React.FC = () => {
  // Helper function to format numbers with commas
  const formatNumberWithCommas = (numStr: string): string => {
    if (!numStr) return '';
    const [integer, decimal] = numStr.split('.');
    const formattedInteger = new Intl.NumberFormat('en-US').format(parseInt(integer.replace(/,/g, ''), 10));
    return decimal ? `${formattedInteger}.${decimal}` : formattedInteger;
  };

  // Helper function to clean numbers (remove commas)
  const cleanNumber = (numStr: string): string => {
    return numStr.replace(/,/g, '');
  };

  const [loanAmount, setLoanAmount] = useState('300,000');
  const [interestRate, setInterestRate] = useState('6.5');
  const [loanTermYears, setLoanTermYears] = useState('30');
  const [extraPayment, setExtraPayment] = useState('0');
  const [paymentType, setPaymentType] = useState<'oneTime' | 'monthly'>('oneTime'); // New state for payment type
  const [results, setResults] = useState<MortgageResults | null>(null);
  const [errors, setErrors] = useState({
    loanAmount: '',
    interestRate: '',
    loanTermYears: '',
    extraPayment: '',
  });

  const handleCalculation = () => {
    const newErrors = {
      loanAmount: validateNumericInput(cleanNumber(loanAmount)) ? '' : 'Invalid amount',
      interestRate: validateNumericInput(interestRate) ? '' : 'Invalid rate',
      loanTermYears: validateNumericInput(loanTermYears) ? '' : 'Invalid term',
      extraPayment: validateNumericInput(cleanNumber(extraPayment)) ? '' : 'Invalid payment',
    };

    if (Object.values(newErrors).some((error) => error !== '')) {
      setErrors(newErrors);
      setResults(null);
      return;
    }

    setErrors({
      loanAmount: '',
      interestRate: '',
      loanTermYears: '',
      extraPayment: '',
    });

    const inputs = {
      loanAmount: parseFloat(cleanNumber(loanAmount)),
      interestRate: parseFloat(interestRate),
      loanTermYears: parseFloat(loanTermYears),
      extraPayment: parseFloat(cleanNumber(extraPayment)),
      paymentType: paymentType, // Pass paymentType to calculation
    };

    const calculatedResults = calculateMortgage(inputs);
    setResults(calculatedResults);
  };

  const handleClear = () => {
    setLoanAmount('');
    setInterestRate('');
    setLoanTermYears('');
    setExtraPayment('');
    setPaymentType('oneTime'); // Reset payment type to default
    setResults(null);
    setErrors({
      loanAmount: '',
      interestRate: '',
      loanTermYears: '',
      extraPayment: '',
    });
  };

  useEffect(() => {
    handleCalculation();
  }, [loanAmount, interestRate, loanTermYears, extraPayment, paymentType]); // Add paymentType to dependencies

  const hasExtraPayment = parseFloat(cleanNumber(extraPayment)) > 0;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Ionicons name="calculator" size={32} color={Colours.primary} />
            <Text style={styles.headerTitle}>Mortgage Calculator</Text>
            <Text style={styles.headerSubtitle}>
              Calculate your savings with extra mortgage payments
            </Text>
          </View>

          {/* Input Section */}
          <View style={styles.inputSection}>
            <View style={styles.sectionHeader}>
              <Ionicons name="card" size={20} color={Colours.primary} />
              <Text style={styles.sectionTitle}>Loan Details</Text>
            </View>

            <InputField
              label="Loan Amount"
              value={formatNumberWithCommas(loanAmount)}
              onChangeText={(text) => setLoanAmount(cleanNumber(text))}
              placeholder="e.g., 300,000"
              prefix="$"
              error={errors.loanAmount}
              numericFormat="integer"
            />

            <InputField
              label="Interest Rate"
              value={interestRate}
              onChangeText={setInterestRate}
              placeholder="e.g., 6.5"
              prefix="%"
              error={errors.interestRate}
              numericFormat="decimal"
            />

            <InputField
              label="Loan Term (Years)"
              value={loanTermYears}
              onChangeText={setLoanTermYears}
              placeholder="e.g., 30"
              error={errors.loanTermYears}
              numericFormat="integer"
            />

            {/* Payment Type Selector */}
            <View style={styles.paymentTypeContainer}>
              <TouchableOpacity
                style={[styles.paymentTypeButton, paymentType === 'oneTime' && styles.paymentTypeButtonActive]}
                onPress={() => setPaymentType('oneTime')}
              >
                <Text style={[styles.paymentTypeButtonText, paymentType === 'oneTime' && { color: Colours.background.primary }]}>One-Time Payment</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.paymentTypeButton, paymentType === 'monthly' && styles.paymentTypeButtonActive]}
                onPress={() => setPaymentType('monthly')}
              >
                <Text style={[styles.paymentTypeButtonText, paymentType === 'monthly' && { color: Colours.background.primary }]}>Monthly Recurring</Text>
              </TouchableOpacity>
            </View>

            <InputField
              label={paymentType === 'oneTime' ? "One-Time Extra Payment" : "Extra Monthly Payment"}
              value={formatNumberWithCommas(extraPayment)}
              onChangeText={(text) => setExtraPayment(cleanNumber(text))}
              placeholder={paymentType === 'oneTime' ? "e.g., 50,000" : "e.g., 100"}
              prefix="$"
              error={errors.extraPayment}
              numericFormat="integer"
            />

            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
              <Ionicons name="close-circle" size={20} color={Colours.text.secondary} />
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>

            <View style={styles.tipContainer}>
              <Ionicons name="information-circle" size={20} color={Colours.primary} />
              <Text style={styles.tipText}>
                <Text style={styles.tipBold}>Tip:</Text> Even small extra payments can save
                thousands in interest and years off your loan term.
              </Text>
            </View>
          </View>

          {/* Results Section */}
          {results && (
            <View style={styles.resultsSection}>
              {/* Monthly Payment Card */}
              <View style={styles.monthlyPaymentCard}>
                <View style={styles.monthlyPaymentTitleContainer}>
                  <Text style={styles.monthlyPaymentTitle}>Monthly Payment</Text>
                  <InfoButton note="This is your estimated monthly mortgage payment, including principal and interest, without any extra payments." />
                </View>
                <Text style={styles.monthlyPaymentValue}>
                  {formatCurrency(results.monthlyPaymentRegular)}
                </Text>
                <Text style={styles.monthlyPaymentLabel}>Regular monthly payment</Text>
                {hasExtraPayment && (
                  <View style={styles.extraPaymentContainer}>
                    <View style={styles.separator} />
                    {paymentType === 'oneTime' ? (
                      // For one-time payments, show the upfront cost + monthly payment
                      <View style={styles.oneTimePaymentDisplay}>
                        <Text style={styles.oneTimeUpfrontLabel}>Upfront Payment:</Text>
                        <Text style={styles.oneTimeUpfrontValue}>
                          {formatCurrency(parseFloat(cleanNumber(extraPayment)))}
                        </Text>
                        <Text style={styles.oneTimePlusLabel}>+</Text>
                        <Text style={styles.oneTimeMonthlyLabel}>Monthly Payment:</Text>
                        <Text style={styles.extraPaymentValue}>
                          {formatCurrency(results.monthlyPaymentExtra)}
                        </Text>
                        <Text style={styles.extraPaymentLabel}>
                          Reduced monthly payment after upfront payment
                        </Text>
                      </View>
                    ) : (
                      // For monthly payments, show the combined monthly payment
                      <>
                        <Text style={styles.extraPaymentValue}>
                          {formatCurrency(results.monthlyPaymentExtra)}
                        </Text>
                        <Text style={styles.extraPaymentLabel}>
                          With extra monthly payment
                        </Text>
                      </>
                    )}
                  </View>
                )}
              </View>

              {/* Savings Cards */}
              {hasExtraPayment && (
                <View style={styles.savingsCards}>
                  <View style={styles.savingsCardHeader}>
                    <ResultCard
                      title="Interest Savings"
                      value={formatCurrency(results.interestSavings)}
                      subtitle="Total interest saved over loan term"
                      color={Colours.success}
                      icon="trending-down"
                    />
                    <InfoButton note="This is the total amount of interest you save by making extra payments compared to only making regular payments." />
                  </View>

                  <View style={styles.savingsCardHeader}>
                    <ResultCard
                      title="Time Savings"
                      value={`${results.timeSavings.years}y ${results.timeSavings.months}m`}
                      subtitle="Loan paid off earlier"
                      color={Colours.accent}
                      icon="time"
                    />
                    <InfoButton note="This is the amount of time (years and months) you save on your loan term by making extra payments." />
                  </View>
                </View>
              )}

              {/* Loan Comparison */}
              <LoanComparison results={results} extraPaymentType={hasExtraPayment ? paymentType : undefined} />

            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.background.secondary,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colours.text.primary,
    marginTop: 8,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colours.text.secondary,
    textAlign: 'center',
  },
  inputSection: {
    backgroundColor: Colours.background.primary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colours.border.light,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colours.text.primary,
    marginLeft: 8,
  },
  paymentTypeContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: Colours.background.secondary,
    borderRadius: 8,
    overflow: 'hidden',
  },
  paymentTypeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colours.border.light,
    borderRadius: 8,
    marginHorizontal: -1, // Overlap borders
  },
  paymentTypeButtonActive: {
    backgroundColor: Colours.primary,
    borderColor: Colours.primary,
  },
  paymentTypeButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colours.text.primary,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  clearButtonText: {
    color: Colours.text.secondary,
    marginLeft: 4,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colours.primaryLight,
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: Colours.primary,
    marginLeft: 8,
    lineHeight: 20,
  },
  tipBold: {
    fontWeight: '600',
  },
  resultsSection: {
    marginBottom: 24,
  },
  monthlyPaymentCard: {
    backgroundColor: Colours.background.primary,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colours.border.light,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  monthlyPaymentTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  monthlyPaymentTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colours.text.primary,
  },
  monthlyPaymentValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colours.primary,
    marginBottom: 4,
  },
  monthlyPaymentLabel: {
    fontSize: 14,
    color: Colours.text.secondary,
  },
  extraPaymentContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  separator: {
    height: 1,
    backgroundColor: Colours.border.light,
    width: '100%',
    marginBottom: 12,
  },
  extraPaymentValue: {
    fontSize: 24,
    fontWeight: '600',
    color: Colours.success,
    marginBottom: 4,
  },
  extraPaymentLabel: {
    fontSize: 12,
    color: Colours.text.secondary,
  },
  savingsCards: {
    marginBottom: 16,
  },
  savingsCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  oneTimePaymentDisplay: {
    alignItems: 'center',
  },
  oneTimeUpfrontLabel: {
    fontSize: 12,
    color: Colours.text.secondary,
    marginBottom: 4,
  },
  oneTimeUpfrontValue: {
    fontSize: 20,
    fontWeight: '600',
    color: Colours.accent,
    marginBottom: 8,
  },
  oneTimePlusLabel: {
    fontSize: 16,
    color: Colours.text.secondary,
    marginBottom: 8,
  },
  oneTimeMonthlyLabel: {
    fontSize: 12,
    color: Colours.text.secondary,
    marginBottom: 4,
  },
});

export default MortgageCalculatorScreen;