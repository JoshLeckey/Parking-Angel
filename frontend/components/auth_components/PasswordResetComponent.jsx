import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { resetPassword } from '../../clients/AuthClient';

const PasswordResetComponent = ({ token, username, onResetSuccess }) => {
    const [state, setState] = useState({
        password: "",
        confirmPass: "",
        error: ""
    });

    const [isResetSuccessful, setIsResetSuccessful] = useState(false);

    const handlePasswordChange = () => {
        if (state.password.trim() === "") {
            setState({ ...state, error: "Password cannot be empty." });
            return;
        }
        if (state.password.trim() !== state.confirmPass.trim()) {
            setState({ ...state, error: "Passwords do not match. Please check and submit again" });
            return;
        }
        console.log(token, username, state.password)
        resetPassword({ token, username, password: state.password }).then(json => {
            console.log(json.message)
            if (json.message === "Password reset successful") {
                setIsResetSuccessful(true);
            } else {
                setState({ ...state, error: "Passwords do not meet requirements" });
            }
        }).catch(error => {
            console.error(error);
            setState({ ...state, error: "An error occurred during password reset." });
        });
    };

    if (isResetSuccessful) {
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../../assets/logo.png')} />
                <Text style={{ color: '#F0EAD6', fontSize: 30, marginBottom: 15 }}>Password Successfully Reset</Text>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={onResetSuccess}
                >
                    <Text style={styles.buttonText}>Go to Login</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/logo.png')} />
            <Text style={{ color: '#F0EAD6', fontSize: 30, marginBottom: 15 }}>Reset Password</Text>
            {state.error !== "" && <Text style={styles.errorText}>{state.error}</Text>}
            <TextInput
                style={styles.input}
                placeholder="New Password"
                onChangeText={(text) => setState({ ...state, password: text })}
                value={state.password}
                secureTextEntry={true}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm New Password"
                onChangeText={(text) => setState({ ...state, confirmPass: text })}
                value={state.confirmPass}
                secureTextEntry={true}
            />
            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={handlePasswordChange}
            >
                <Text style={styles.buttonText}>Reset Password</Text>
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

export default PasswordResetComponent;
