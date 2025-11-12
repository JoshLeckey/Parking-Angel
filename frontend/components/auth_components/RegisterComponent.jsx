import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { registerUser } from '../../clients/AuthClient';

const RegisterComponent = ({ onRegisterSuccess, onNavigateToLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const register = () => {
        //TODO: Implement validation logic in util directory preferably
        if (username.trim() === "" || password.trim() === "" || email.trim() === "" || fullname.trim() === "") {
            setError("All fields are required");
            return;
        }

        registerUser({ username, password, fullName: fullname, email })
            .then(json => {
                if (json.status === "201") {
                    onRegisterSuccess(); //Callback to Auth screen
                } else {
                    setError("Registration failed. Please try again.");
                }
            })
            .catch(error => {
                setError("An error occurred during registration.");
            });
    };

    return (
        <View style={styles.container}>
            {/* Omitting the <Video> component for brevity */}
            <Image style={styles.logo} source={require('../../assets/logo.png')} />
            <Text style={{ color: '#F0EAD6', fontSize: 30, marginBottom: 15 }}>Register</Text>
            <TextInput style={styles.input} placeholder="Full Name" onChangeText={setFullname} value={fullname} />
            <TextInput style={styles.input} placeholder="Username" onChangeText={setUsername} value={username} />
            <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} value={email} />
            <TextInput style={styles.input} placeholder="Password" onChangeText={setPassword} value={password} secureTextEntry={true} />
            <TouchableOpacity style={styles.buttonStyle} onPress={register}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyle} onPress={onNavigateToLogin}>
                <Text style={styles.buttonText}>Login Page</Text>
            </TouchableOpacity>
            {error !== "" && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection:'column', 
        gap: 6,
    },
    logo: {
        width: 300,
        height: 300,
    },
    video: {
        position: "absolute",
        top: 0,
        left: 0,
        alignItems: "cover",
        bottom: 0,
        right: 0,
        width: '100%',
        height: '100%',

      },
      input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        width: 200,
        textAlign: 'center',
        borderRadius: 20, // Adjust the value as needed
        backgroundColor: '#F6F6F4',
        marginBottom:15 // Set a background color with some transparency
    },
    buttonStyle: {
        height: 40,
        borderColor: '#1E2028',
        borderWidth: 1,
        marginBottom: 10,
        width: 200,
        marginTop: 15,
        marginBottom:0,
        borderRadius: 20, // Adjust the value as needed
        backgroundColor: '#1E2028', // Set a background color with some transparency
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    }
});

export default RegisterComponent