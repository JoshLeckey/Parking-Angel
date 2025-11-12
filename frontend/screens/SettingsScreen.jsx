import React, { useState } from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AccountSettingsComponent from '../components/settings_components/AccountSettingsComponent';
import PreferencesComponent from '../components/settings_components/PreferencesComponent';
import HelpSettingsComponent from '../components/settings_components/HelpSettingsComponent';
import AboutSettingsComponent from '../components/settings_components/AboutSettingsComponent';

const SettingsScreen = ({ navigation }) => {
  const [activeScreen, setActiveScreen] = useState('');

  const settingsData = [
    { title: 'Edit Profile', component: 'AccountSettingsComponent' },
    //{ title: 'Change Password', component: 'ChangePasswordComponent' },
    { title: 'Preferences', component: 'PreferencesComponent' },
    //{ title: 'Privacy', component: 'PrivacyComponent' },
    { title: 'Help', component: 'HelpSettingsComponent' },
    { title: 'About', component: 'AboutSettingsComponent' },
  ];

  const handlePress = (componentName) => {
    setActiveScreen(componentName);
  };

  const renderComponent = () => {
    switch (activeScreen) {
      case 'AccountSettingsComponent':
        return <AccountSettingsComponent />;
      case 'PreferencesComponent':
        return <PreferencesComponent />;
      case 'HelpSettingsComponent':
        return <HelpSettingsComponent />;
      case 'AboutSettingsComponent':
        return <AboutSettingsComponent />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('MapScreen')}>
        <Icon name="arrow-back" size={25} color="#000" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Settings</Text>
      {activeScreen ? (
        renderComponent()
      ) : (
        settingsData.map((item, index) => (
          <View style={styles.itemContainer} key={index}>
            <Button
              title={item.title}
              color="#1E2028"
              onPress={() => handlePress(item.component)}
            />
          </View>
        ))
      )}
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
  itemContainer: {
    marginBottom: 30, // Increase this value to add more spacing
  },
  buttonText: {
    fontSize: 20, // Increase this value to make the text bigger
  },
});

export default SettingsScreen;