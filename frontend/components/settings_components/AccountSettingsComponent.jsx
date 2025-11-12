import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AccountSettingsComponent = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={25} color="#000" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Account Settings</Text>
      <Button title="Change Name" onPress={() => navigation.navigate('ChangeNameComponent')} />
      <Button title="Change Phone Number" onPress={() => navigation.navigate('ChangePhoneNumberComponent')} />
      <Button title="Change Email" onPress={() => navigation.navigate('ChangeEmailComponent')} />
      <Button title="Change Gender" onPress={() => navigation.navigate('ChangeGenderComponent')} />
      <Button title="Change Pronouns" onPress={() => navigation.navigate('ChangePronounsComponent')} />
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 18,
    marginLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default AccountSettingsComponent;