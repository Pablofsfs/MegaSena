import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const NumberCircle = ({ number, isSelected, isDisabled, onSelect, isMatch }) => {
  return (
    <TouchableOpacity
      style={[
        styles.circle,
        isSelected && styles.selectedCircle,
        isDisabled && styles.disabledCircle,
      ]}
      onPress={() => onSelect(number)}
      disabled={isDisabled && !isSelected}
    >
      <View style={[styles.innerCircle, isMatch && styles.matchCircle]}>
        <Text style={styles.numberText}>{String(number).padStart(2, '0')}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 45,
    height: 45,
    borderRadius: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: '#00FFFF',
  },
  innerCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#00FFFF',
  },
  selectedCircle: {
    backgroundColor: '#1b4ffd',
    borderColor: '#1b4ffd',
  },
  disabledCircle: {
    opacity: 0.3,
  },
  matchCircle: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  numberText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default NumberCircle;
