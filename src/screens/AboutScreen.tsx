import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colours } from '@/constants/colours';

interface AboutScreenProps {
  onBack: () => void;
}

const AboutScreen: React.FC<AboutScreenProps> = ({ onBack }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="chevron-back" size={24} color={Colours.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <View style={styles.appInfo}>
            <View style={styles.iconContainer}>
              <Ionicons name="calculator" size={48} color={Colours.primary} />
            </View>
            <Text style={styles.appName}>OwnItSooner</Text>
            <Text style={styles.appVersion}>Version 1.0.2</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About This App</Text>
          <Text style={styles.description}>
            OwnItSooner is a smart mortgage calculator that helps homeowners and prospective buyers 
            optimize their mortgage payments and save thousands in interest through strategic payment planning.
          </Text>
          
          <Text style={styles.description}>
            Whether you're buying your first home or looking to pay off your current mortgage faster, 
            this app provides comprehensive calculations and side-by-side comparisons to help you make 
            informed financial decisions.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Ionicons name="calculator" size={20} color={Colours.primary} />
              <Text style={styles.featureText}>Real-time mortgage calculations</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="analytics" size={20} color={Colours.primary} />
              <Text style={styles.featureText}>Side-by-side payment comparisons</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="trending-up" size={20} color={Colours.primary} />
              <Text style={styles.featureText}>Interest savings analysis</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="time" size={20} color={Colours.primary} />
              <Text style={styles.featureText}>Time savings calculations</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="shield-checkmark" size={20} color={Colours.primary} />
              <Text style={styles.featureText}>Privacy-focused (all calculations local)</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Developer</Text>
          <Text style={styles.description}>
            Developed by Can1Cyp2 (Sebastian L)
          </Text>
          <Text style={styles.description}>
            Website: SebastianLandry.ca
          </Text>
          <Text style={styles.description}>
            Email: can1cyp2apps@gmail.com
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Security</Text>
          <Text style={styles.description}>
            Your privacy is our priority. All mortgage calculations are performed locally on your device. 
            We don't collect, store, or transmit any of your financial information.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>License</Text>
          <Text style={styles.description}>
            This app is licensed under the Apache License 2.0 with Commons Clause. 
            The source code is available for personal use and contributions, but commercial use is prohibited without permission.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.background.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colours.border.light,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colours.text.primary,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
    paddingTop: 16,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colours.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: '700',
    color: Colours.text.primary,
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 16,
    color: Colours.text.secondary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colours.text.primary,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: Colours.text.secondary,
    lineHeight: 24,
    marginBottom: 12,
  },
  featureList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 16,
    color: Colours.text.secondary,
    marginLeft: 12,
    flex: 1,
  },
});

export default AboutScreen;