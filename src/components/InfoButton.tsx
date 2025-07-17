import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colours } from '@/constants/colours';

interface InfoButtonProps {
  note: string;
}

const { width: screenWidth } = Dimensions.get('window');
const NOTE_WIDTH = 250;
const BUTTON_ICON_WIDTH = 18; // Approximate width of the Ionicons info icon
const PADDING = 10; // Padding from screen edges

const InfoButton: React.FC<InfoButtonProps> = ({ note }) => {
  const [showNote, setShowNote] = useState(false);
  const buttonRef = useRef<any>(null);
  const [notePosition, setNotePosition] = useState<{ left?: number; right?: number }>({});

  const handlePress = () => {
    setShowNote(!showNote);
    if (!showNote && buttonRef.current) {
      // Get the button's position relative to the screen
      buttonRef.current.measureInWindow((screenX: number, screenY: number, width: number, height: number) => {
        // Get the button's position relative to its parent
        buttonRef.current.measure((x: number, y: number, buttonWidth: number, buttonHeight: number, pageX: number, pageY: number) => {
          // Calculate how much space we have to the right of the button
          const spaceToRight = screenWidth - (screenX + width);
          
          // Calculate how much space we have to the left of the button
          const spaceToLeft = screenX;
          
          let calculatedLeft: number;
          
          // If we have enough space to the right, position normally (centered under button)
          if (spaceToRight >= NOTE_WIDTH / 2 + PADDING) {
            calculatedLeft = x + (width / 2) - (NOTE_WIDTH / 2);
          }
          // If we have more space to the left, align the note's right edge with the button's left edge
          else if (spaceToLeft >= NOTE_WIDTH + PADDING) {
            calculatedLeft = x - NOTE_WIDTH;
          }
          // Otherwise, position as far right as possible while staying on screen
          else {
            // Position relative to parent, but ensure it fits on screen
            const maxLeft = screenWidth - NOTE_WIDTH - PADDING - screenX + x;
            calculatedLeft = Math.min(x + width / 2 - NOTE_WIDTH / 2, maxLeft);
          }
          
          // Final safety check - ensure it's not negative
          calculatedLeft = Math.max(calculatedLeft, -screenX + PADDING);
          
          setNotePosition({ left: calculatedLeft });
        });
      });
    } else {
      setNotePosition({}); // Reset position when hiding
    }
  };

  return (
    <View>
      <TouchableOpacity ref={buttonRef} onPress={handlePress} style={styles.button}>
        <Ionicons name="information-circle-outline" size={BUTTON_ICON_WIDTH} color={Colours.text.secondary} />
      </TouchableOpacity>
      {showNote && (
        <>
          {/* Invisible backdrop to close the note when tapped */}
          <TouchableOpacity 
            style={styles.backdrop}
            onPress={() => setShowNote(false)}
            activeOpacity={1}
          />
          <TouchableOpacity 
            style={[styles.noteContainer, notePosition]}
            onPress={() => setShowNote(false)}
            activeOpacity={0.8}
          >
            <Text style={styles.noteText}>{note}</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginLeft: 8,
    padding: 4,
  },
  backdrop: {
    position: 'absolute',
    top: -1000,
    left: -1000,
    right: -1000,
    bottom: -1000,
    zIndex: 9,
  },
  noteContainer: {
    position: 'absolute',
    top: 25, // Adjust as needed to position below the button
    backgroundColor: Colours.background.primary,
    borderRadius: 8,
    padding: 10,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: NOTE_WIDTH, // Fixed width for the note
    borderWidth: 1,
    borderColor: Colours.border.light,
  },
  noteText: {
    fontSize: 12,
    color: Colours.text.primary,
    lineHeight: 16,
  },
});

export default InfoButton;