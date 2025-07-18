// Updated LoanComparison component

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LoanComparisonProps } from '@/types';
import { Colours } from '@/constants/colours';
import { formatCurrency } from '@/utils/mortgageCalculations';
import InfoButton from './InfoButton';

const LoanComparison: React.FC<LoanComparisonProps> = ({ results, extraPaymentType }) => {
  const ComparisonRow = ({
    label,
    regularValue,
    extraValue,
    backgroundColor = Colours.background.accent
  }: {
    label: string;
    regularValue: string;
    extraValue?: string;
    backgroundColor?: string;
  }) => (
    <View style={[styles.row, { backgroundColor }]}>
      <Text style={styles.rowLabel}>{label}</Text>
      <View style={styles.values}>
        <Text style={styles.regularValue}>{regularValue}</Text>
        {extraValue && extraPaymentType && (
          <Text style={styles.extraValue}>{extraValue}</Text>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.comparisonSectionHeader}>
        <Text style={styles.comparisonTitle}>Loan Comparison</Text>
        <InfoButton note="Compare the total interest and total amount paid with and without extra payments." />
      </View>
      
      <View style={styles.comparisonContainer}>
        <ComparisonRow
          label="Total Interest"
          regularValue={formatCurrency(results.totalInterestRegular)}
          extraValue={formatCurrency(results.totalInterestExtra)}
          backgroundColor={Colours.background.accent}
        />
        
        <ComparisonRow
          label={extraPaymentType === 'oneTime' ? "Total Amount (including upfront payment)" : "Total Amount"}
          regularValue={formatCurrency(results.totalAmountRegular)}
          extraValue={formatCurrency(results.totalAmountExtra)}
          backgroundColor={Colours.background.secondary}
        />

        {extraPaymentType && (
          <ComparisonRow
            label={extraPaymentType === 'oneTime' ? "Monthly Payment (after upfront payment)" : "Monthly Payment (with extra payment)"}
            regularValue={formatCurrency(results.monthlyPaymentRegular)}
            extraValue={formatCurrency(results.monthlyPaymentExtra)}
            backgroundColor={Colours.background.accent}
          />
        )}
        
        {extraPaymentType && (
          <>
            <View style={styles.savingsSection}>
              <Text style={styles.savingsTitle}>Your Savings</Text>
              
              <View style={styles.savingsRow}>
                <Text style={styles.savingsLabel}>Interest Saved:</Text>
                <Text style={styles.savingsValue}>
                  {formatCurrency(results.interestSavings)}
                </Text>
              </View>
              
              <View style={styles.savingsRow}>
                <Text style={styles.savingsLabel}>Time Saved:</Text>
                <Text style={styles.savingsValue}>
                  {results.timeSavings.years}y {results.timeSavings.months}m
                </Text>
              </View>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colours.background.primary,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
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
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colours.text.primary,
    marginBottom: 16,
  },
  comparisonContainer: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  rowLabel: {
    fontSize: 14,
    color: Colours.text.secondary,
    flex: 1,
  },
  values: {
    alignItems: 'flex-end',
  },
  regularValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colours.text.primary,
  },
  extraValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colours.success,
    marginTop: 2,
  },
  savingsSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colours.border.light,
  },
  savingsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colours.success,
    marginBottom: 12,
  },
  savingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  savingsLabel: {
    fontSize: 14,
    color: Colours.text.secondary,
  },
  savingsValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colours.success,
  },
  comparisonSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  comparisonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colours.text.primary,
    marginRight: 8,
  },
});

export default LoanComparison;