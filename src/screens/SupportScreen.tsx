import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colours } from '@/constants/colours';
import AdMobService from '@/utils/adMobService';

interface SupportScreenProps {
  onBack: () => void;
}

const SupportScreen: React.FC<SupportScreenProps> = ({ onBack }) => {
  const [adsWatched, setAdsWatched] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [adReady, setAdReady] = useState(false);

  useEffect(() => {
    // Initialize AdMob and load first ad
    initializeAds();
  }, []);

  const initializeAds = async () => {
    setIsLoading(true);
    try {
      await AdMobService.initialize();
      const loaded = await AdMobService.loadRewardedAd();
      setAdReady(loaded);
    } catch (error) {
      console.error('Failed to initialize ads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWatchAd = async () => {
    if (isLoading) return;

    Alert.alert(
      '❤️ Support OwnItSooner',
      'Watch a short ad to support the development of this free app?',
      [
        {
          text: 'Not Now',
          style: 'cancel',
        },
        {
          text: '❤️ Watch Ad',
          onPress: () => showRewardedAd(),
        },
      ]
    );
  };

  const showRewardedAd = async () => {
    setIsLoading(true);
    
    try {
      if (!adReady) {
        // Try to load ad if not ready
        const loaded = await AdMobService.loadRewardedAd();
        if (!loaded) {
          Alert.alert(
            'Ad Not Available',
            'Sorry, no ads are available right now. Thank you for your willingness to support!',
            [{ text: 'OK' }]
          );
          setIsLoading(false);
          return;
        }
      }

      const result = await AdMobService.showRewardedAd();
      
      if (result.success && result.rewarded) {
        // User successfully watched the ad
        setAdsWatched(prev => prev + 1);
        
        // Load next ad for future use
        AdMobService.loadRewardedAd().then(setAdReady);
        
        // Show thank you message
        Alert.alert(
          '❤️ Thank You!',
          'Thank you for supporting OwnItSooner! Your support helps keep this app free and enables new features.',
          [{ text: 'You\'re Welcome!' }]
        );
      } else if (result.success && !result.rewarded) {
        // Ad was shown but user didn't complete it
        Alert.alert(
          'Thanks Anyway!',
          'Thanks for trying to support the app, even if you didn\'t complete the ad.',
          [{ text: 'OK' }]
        );
      } else {
        // Ad failed to show
        Alert.alert(
          'Ad Failed',
          'Sorry, there was an issue showing the ad. Thank you for trying to support!',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error showing ad:', error);
      Alert.alert(
        'Error',
        'Sorry, there was an issue with the ad. Thank you for trying to support!',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtherSupport = () => {
    Alert.alert(
      '❤️ Other Ways to Support',
      'You can also support OwnItSooner by:\n\n• Rating the app in the store\n• Sharing with friends\n• Providing feedback\n• Following Sebastian Landry on LinkedIn',
      [{ text: 'Got it!' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="chevron-back" size={24} color={Colours.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Support Developer</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <View style={styles.heroSection}>
            <Ionicons name="heart" size={64} color={Colours.error} />
            <Text style={styles.heroTitle}>Support OwnItSooner</Text>
            <Text style={styles.heroSubtitle}>
              Help keep this app free and support continued development
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.statCard}>
            <Ionicons name="analytics" size={32} color={Colours.primary} />
            <Text style={styles.statTitle}>Ads Watched</Text>
            <Text style={styles.statNumber}>{adsWatched}</Text>
            <Text style={styles.statSubtitle}>Thank you for your support! ❤️</Text>
          </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity 
            style={[
              styles.primaryButton, 
              (isLoading || !adReady) && styles.disabledButton
            ]} 
            onPress={handleWatchAd}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={Colours.background.primary} />
            ) : (
              <Ionicons name="play-circle" size={24} color={Colours.background.primary} />
            )}
            <Text style={styles.primaryButtonText}>
              {isLoading ? 'Loading Ad...' : 'Watch Ad to Support'}
            </Text>
          </TouchableOpacity>
          {!adReady && !isLoading && (
            <Text style={styles.adStatusText}>
              Loading ads... Please check your internet connection.
            </Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Support?</Text>
          <View style={styles.reasonList}>
            <View style={styles.reasonItem}>
              <Ionicons name="checkmark-circle" size={20} color={Colours.success} />
              <Text style={styles.reasonText}>Keeps the app completely free</Text>
            </View>
            <View style={styles.reasonItem}>
              <Ionicons name="checkmark-circle" size={20} color={Colours.success} />
              <Text style={styles.reasonText}>Supports new feature development</Text>
            </View>
            <View style={styles.reasonItem}>
              <Ionicons name="checkmark-circle" size={20} color={Colours.success} />
              <Text style={styles.reasonText}>Helps with app maintenance and updates</Text>
            </View>
            <View style={styles.reasonItem}>
              <Ionicons name="checkmark-circle" size={20} color={Colours.success} />
              <Text style={styles.reasonText}>Supports an independent developer</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.secondaryButton} onPress={handleOtherSupport}>
            <Ionicons name="gift" size={20} color={Colours.primary} />
            <Text style={styles.secondaryButtonText}>Other Ways to Support</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.developerNote}>
            "Thank you for using OwnItSooner! Every bit of support helps me continue developing 
            useful financial tools for everyone." - Can1Cyp2 (Sebastian)
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
  heroSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colours.text.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: Colours.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  statCard: {
    backgroundColor: Colours.background.secondary,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colours.border.light,
  },
  statTitle: {
    fontSize: 16,
    color: Colours.text.secondary,
    marginTop: 12,
    marginBottom: 4,
  },
  statNumber: {
    fontSize: 36,
    fontWeight: '700',
    color: Colours.primary,
    marginBottom: 4,
  },
  statSubtitle: {
    fontSize: 14,
    color: Colours.text.secondary,
  },
  primaryButton: {
    backgroundColor: Colours.primary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colours.background.primary,
  },
  secondaryButton: {
    backgroundColor: Colours.background.secondary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: Colours.border.medium,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colours.primary,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colours.text.primary,
    marginBottom: 16,
  },
  reasonList: {
    gap: 12,
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  reasonText: {
    fontSize: 16,
    color: Colours.text.secondary,
    flex: 1,
  },
  developerNote: {
    fontSize: 16,
    color: Colours.text.secondary,
    fontStyle: 'italic',
    lineHeight: 24,
    textAlign: 'center',
    backgroundColor: Colours.background.secondary,
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colours.primary,
  },
  disabledButton: {
    opacity: 0.6,
  },
  adStatusText: {
    fontSize: 14,
    color: Colours.text.secondary,
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
});

export default SupportScreen;