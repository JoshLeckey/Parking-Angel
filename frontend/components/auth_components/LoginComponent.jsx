import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { loginUser } from '../../clients/AuthClient'; 

const LoginComponent = ({ onLoginSuccess, onNavigateToRegister, onNavigateToForgotPassword}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        //TODO: Implement same validation logic as register
        if (username.trim() === "" || password.trim() === "") {
            setError("Username and password are required");
            return;
        }

        onLoginSuccess();

        /*loginUser({ username, password })
            .then(json => {
                if (json.status === "200") { // TODO: check if returning status is 200
                    onLoginSuccess(); // Callback to Auth screen
                } else {
                    setError("Invalid username or password. Please try again.");
                }
            })
            .catch(error => {
                console.error(error);
                setError("An error occurred during login.");
            });*/
    };

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/logo.png')} />
            <Text style={{color : '#F0EAD6', fontSize: 30, marginBottom:15}}>Login</Text>
            {error !== "" && <Text style={styles.errorText}>{error}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={setUsername}
                value={username}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
            />
            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={handleLogin}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={onNavigateToRegister}
            >
                <Text style={styles.buttonText}>Register Page</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={onNavigateToForgotPassword}
            >
                <Text style={styles.buttonText}>Forgot Password</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 300,
        height: 300,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        width: 200,
        textAlign: 'center',
        borderRadius: 20,
        backgroundColor: '#F6F6F4',
        marginBottom: 15
    },
    buttonStyle: {
        height: 40,
        borderColor: '#1E2028',
        borderWidth: 1,
        width: 200,
        marginTop: 15,
        marginBottom: 20,
        borderRadius: 20,
        backgroundColor: '#1E2028',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    }
});

export default LoginComponent;
