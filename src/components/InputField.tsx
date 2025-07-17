import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Colours } from '@/constants/colours';

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  prefix?: string;
  keyboardType?: 'numeric' | 'default';
  error?: string;
  numericFormat?: 'integer' | 'decimal';
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  prefix,
  keyboardType = 'numeric',
  error,
  numericFormat = 'integer',
}) => {
  const handleChange = (text: string) => {
    let processedText = text;
    if (numericFormat === 'integer') {
      const cleaned = text.replace(/[^\d]/g, '');
      if (cleaned === '') {
        processedText = '';
      } else {
        const num = parseInt(cleaned, 10);
        processedText = isNaN(num) ? '' : new Intl.NumberFormat('en-US').format(num);
      }
    } else if (numericFormat === 'decimal') {
      const cleaned = text.replace(/[^\d.]/g, '');
      const parts = cleaned.split('.');
      if (parts.length > 2) {
        processedText = `${parts[0]}.${parts.slice(1).join('')}`;
      } else {
        processedText = cleaned;
      }
    }
    onChangeText(processedText);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer, error ? styles.errorBorder : {}]}>
        {prefix && <Text style={styles.prefix}>{prefix}</Text>}
        <TextInput
          style={[styles.input, prefix && styles.inputWithPrefix]}
          value={value}
          onChangeText={handleChange}
          placeholder={placeholder}
          keyboardType={keyboardType}
          placeholderTextColor={Colours.text.light}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Colours.text.primary,
    marginBottom: 8,
  },
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colours.border.light,
    backgroundColor: Colours.background.primary,
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 12,
    fontSize: 16,
    color: Colours.text.primary,
  },
  inputWithPrefix: {
    paddingLeft: 32,
  },
  prefix: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
    fontSize: 16,
    color: Colours.text.secondary,
  },
  errorBorder: {
    borderColor: Colours.error,
  },
  errorText: {
    color: Colours.error,
    fontSize: 12,
    marginTop: 4,
  },
});

export default InputField;