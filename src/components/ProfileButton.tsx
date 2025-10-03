import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colours } from '@/constants/colours';

interface ProfileButtonProps {
  onPress: () => void;
  size?: number;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ onPress, size = 28 }) => {
  return (
    <TouchableOpacity style={styles.profileButton} onPress={onPress}>
      <Ionicons 
        name="person-circle" 
        size={size} 
        color={Colours.primary} 
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  profileButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: Colours.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
});

export default ProfileButton;