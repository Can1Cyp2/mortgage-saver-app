import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import InputField from '@/components/InputField';
import ResultCard from '@/components/ResultCard';
import LoanComparison from '@/components/LoanComparison';
import { Colours } from '@/constants/colours';
import { calculateMortgage, formatCurrency, validateNumericInput } from '@/utils/mortgageCalculations';
import { MortgageResults } from '@/types';

const MortgageCalculatorScreen: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState('300,000');
  const [interestRate, setInterestRate] = useState('6.5');
  const [loanTermYears, setLoanTermYears] = useState('30');
  const [extraPayment, setExtraPayment] = useState('0');
  const [results, setResults] = useState<MortgageResults | null>(null);
  const [errors, setErrors] = useState({
    loanAmount: '',
    interestRate: '',
    loanTermYears: '',
    extraPayment: '',
  });

  const handleCalculation = () => {
    const newErrors = {
      loanAmount: validateNumericInput(loanAmount) ? '' : 'Invalid amount',
      interestRate: validateNumericInput(interestRate) ? '' : 'Invalid rate',
      loanTermYears: validateNumericInput(loanTermYears) ? '' : 'Invalid term',
      extraPayment: validateNumericInput(extraPayment) ? '' : 'Invalid payment',
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
      loanAmount: parseFloat(loanAmount.replace(/,/g, '')),
      interestRate: parseFloat(interestRate),
      loanTermYears: parseFloat(loanTermYears),
      extraPayment: parseFloat(extraPayment.replace(/,/g, '')),
    };

    const calculatedResults = calculateMortgage(inputs);
    setResults(calculatedResults);
  };

  const handleClear = () => {
    setLoanAmount('');
    setInterestRate('');
    setLoanTermYears('');
    setExtraPayment('');
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
  }, [loanAmount, interestRate, loanTermYears, extraPayment]);

  const hasExtraPayment = parseFloat(extraPayment.replace(/,/g, '')) > 0;

  return (
    <SafeAreaView style={styles.container}>
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
            value={loanAmount}
            onChangeText={setLoanAmount}
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

          <InputField
            label="Extra Monthly Payment"
            value={extraPayment}
            onChangeText={setExtraPayment}
            placeholder="e.g., 100"
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
              <Text style={styles.monthlyPaymentTitle}>Monthly Payment</Text>
              <Text style={styles.monthlyPaymentValue}>
                {formatCurrency(results.monthlyPayment)}
              </Text>
              <Text style={styles.monthlyPaymentLabel}>Regular monthly payment</Text>
              
              {hasExtraPayment && (
                <View style={styles.extraPaymentContainer}>
                  <View style={styles.separator} />
                  <Text style={styles.extraPaymentValue}>
                    {formatCurrency(results.monthlyPayment + parseFloat(extraPayment.replace(/,/g, '')))}
                  </Text>
                  <Text style={styles.extraPaymentLabel}>With extra payment</Text>
                </View>
              )}
            </View>

            {/* Savings Cards */}
            {hasExtraPayment && (
              <View style={styles.savingsCards}>
                <ResultCard
                  title="Interest Savings"
                  value={formatCurrency(results.interestSavings)}
                  subtitle="Total interest saved over loan term"
                  color={Colours.success}
                  icon="trending-down"
                />
                
                <ResultCard
                  title="Time Savings"
                  value={`${results.timeSavings.years}y ${results.timeSavings.months}m`}
                  subtitle="Loan paid off earlier"
                  color={Colours.accent}
                  icon="time"
                />
              </View>
            )}

            {/* Loan Comparison */}
            <LoanComparison results={results} hasExtraPayment={hasExtraPayment} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.background.secondary,
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
  monthlyPaymentTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colours.text.primary,
    marginBottom: 8,
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
});

export default MortgageCalculatorScreen;