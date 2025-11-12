import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';

const PreferencesComponent = ({ navigation }) => {
    const [isNotificationsEnabled, setNotificationsEnabled] = useState(false);
    const [isDarkModeEnabled, setDarkModeEnabled] = useState(false);
    const [language, setLanguage] = useState("English");

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={25} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Preferences</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.bodyText}>Notifications</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isNotificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={setNotificationsEnabled}
                    value={isNotificationsEnabled}
                />
                <Text style={styles.bodyText}>Dark Mode</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isDarkModeEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={setDarkModeEnabled}
                    value={isDarkModeEnabled}
                />
                <Text style={styles.bodyText}>Language</Text>
                <Picker
                    selectedValue={language}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) => setLanguage(itemValue)}
                >
                    <Picker.Item label="English" value="English" />
                    <Picker.Item label="Spanish" value="Spanish" />
                    <Picker.Item label="French" value="French" />
                </Picker>
                {/* Add more options here */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 32,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    body: {
        flex: 1,
    },
    bodyText: {
        fontSize: 24,
        marginBottom: 10,
    },
    picker: {
        height: 50,
        width: 150,
        marginBottom: 20,
    },
});

export default PreferencesComponent;