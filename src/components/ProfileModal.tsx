import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colours } from '@/constants/colours';
import AboutScreen from '@/screens/AboutScreen';
import SupportScreen from '@/screens/SupportScreen';

interface ProfileModalProps {
  visible: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ visible, onClose }) => {
  const [currentScreen, setCurrentScreen] = useState<'profile' | 'about' | 'support'>('profile');

  const handleAboutPress = () => {
    setCurrentScreen('about');
  };

  const handleBackToProfile = () => {
    setCurrentScreen('profile');
  };

  const handleClose = () => {
    setCurrentScreen('profile');
    onClose();
  };

  const handleSettingsPress = () => {
    // Handle settings action
    console.log('Settings pressed');
  };

  const handleSupportPress = () => {
    // Navigate to support screen
    setCurrentScreen('support');
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      {currentScreen === 'about' ? (
        <AboutScreen onBack={handleBackToProfile} />
      ) : currentScreen === 'support' ? (
        <SupportScreen onBack={handleBackToProfile} />
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Profile</Text>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <Ionicons name="close" size={24} color={Colours.text.primary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            {/* App Info Section */}
            <View style={styles.section}>
              <View style={styles.appInfo}>
                <View style={styles.iconContainer}>
                  <Ionicons name="calculator" size={48} color={Colours.primary} />
                </View>
                <Text style={styles.appName}>OwnItSooner</Text>
                <Text style={styles.appVersion}>Version 1.0.2</Text>
                <Text style={styles.appDescription}>
                  Smart Mortgage Calculator
                </Text>
              </View>
            </View>

            {/* Menu Options */}
            <View style={styles.section}>
              <TouchableOpacity style={styles.menuItem} onPress={handleAboutPress}>
                <View style={styles.menuItemLeft}>
                  <Ionicons name="information-circle" size={24} color={Colours.primary} />
                  <Text style={styles.menuItemText}>About</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={Colours.text.secondary} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={handleSettingsPress}>
                <View style={styles.menuItemLeft}>
                  <Ionicons name="settings" size={24} color={Colours.primary} />
                  <Text style={styles.menuItemText}>Settings</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={Colours.text.secondary} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={handleSupportPress}>
                <View style={styles.menuItemLeft}>
                  <Ionicons name="heart" size={24} color="#FF6B6B" />
                  <Text style={styles.menuItemText}>Support Developer</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={Colours.text.secondary} />
              </TouchableOpacity>
            </View>

            {/* Developer Info */}
            <View style={styles.section}>
              <View style={styles.developerInfo}>
                <Text style={styles.developerTitle}>Developed by</Text>
                <Text style={styles.developerName}>Can1Cyp2</Text>
                <Text style={styles.website}>SebastianLandry.ca</Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </Modal>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colours.border.light,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colours.text.primary,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  appInfo: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 32,
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
    fontSize: 14,
    color: Colours.text.secondary,
    marginBottom: 8,
  },
  appDescription: {
    fontSize: 16,
    color: Colours.text.secondary,
    textAlign: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colours.border.light,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: Colours.text.primary,
    marginLeft: 12,
  },
  developerInfo: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  developerTitle: {
    fontSize: 14,
    color: Colours.text.secondary,
    marginBottom: 8,
  },
  developerName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colours.text.primary,
    marginBottom: 4,
  },
  website: {
    fontSize: 14,
    color: Colours.primary,
  },
});

export default ProfileModal;