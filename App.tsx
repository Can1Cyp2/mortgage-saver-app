import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import MortgageCalculatorScreen from './src/screens/MortgageCalculatorScreen';
import { Colours } from './src/constants/colours';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor={Colours.background.secondary} />
      <MortgageCalculatorScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.background.secondary,
  },
});