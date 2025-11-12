import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NavigationToggleButton = ({ iconName, label, onPress }) => {
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Ionicons name={iconName} size={24} />
        <Text>{label}</Text>
      </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
    }
  });
  
  export default NavigationToggleButton;