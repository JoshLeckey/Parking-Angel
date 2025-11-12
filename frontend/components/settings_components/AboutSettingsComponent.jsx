import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AboutSettingsComponent = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={25} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>About Our Parking App</Text>
      <Text style={styles.text}>
        Our Parking App is dedicated to providing you with the most comprehensive and up-to-date parking information available. 
        While we do not currently support bookings, we provide real-time updates on parking availability.
      </Text>
      <Text style={styles.text}>
        Safety is our top priority. We provide crime statistics for each parking location to help you make an informed decision about where to park. 
        These statistics are updated regularly and are sourced from reliable local and national databases.
      </Text>
      <Text style={styles.text}>
        We are constantly working to improve our app and add new features. Stay tuned for future updates!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default AboutSettingsComponent;