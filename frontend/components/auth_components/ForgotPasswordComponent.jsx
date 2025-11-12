import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { forgotPassword, checkResetKey } from '../../clients/AuthClient';

const ForgotPasswordComponent = ({ onForgotSuccess }) => {
    const [state, setState] = useState({
        username: "",
        error: "",
        code: "",
        isEmailSent: false
    });

    const handleTokenSending = useCallback(() => {
        if(state.username.trim() === ""){
            setState(prevState => ({ ...prevState, error: "Username is required" }));
            return;
        }
        forgotPassword({username: state.username})
            .then(json => {
                if(json.message === "Reset key has been sent to your email address"){
                    setState(prevState => ({ ...prevState, isEmailSent: true }));
                }
                else{
                    setState(prevState => ({ ...prevState, error: "Invalid Username. Please try again." }));
                }

            })
            .catch(error => {
                console.error(error);
                setState(prevState => ({ ...prevState, error: "An error occured when trying to send reset code. Please try again" }));
            });
    }, [state.username]);

    const handleTokenVerification = useCallback(() => {
        if(state.code.length !== 0){
            console.log("code: ", state.code, "username: ", state.username)
            checkResetKey({token: state.code, username: state.username})
            .then(json => {
                console.log(json.message);
                if(json.message === "Token validated"){
                    onForgotSuccess(state.code, state.username);
                }
                else{
                    setState(prevState => ({ ...prevState, error: "Invalid Token. Please check it again." }));
                }
            })
            .catch(error => {
                console.error(error);
            });
        }
    }, [state.code, state.username, onForgotSuccess]);

    const handleUsernameChange = useCallback((username) => {
        setState(prevState => ({ ...prevState, username }));
    }, []);

    const handleCodeChange = useCallback((text) => {
        setState(prevState => ({ ...prevState, code: text }));
    }, []);

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/logo.png')} />
            {!state.isEmailSent ? (
                <>
                    <Text style={{color : '#F0EAD6', fontSize: 30, marginBottom:15}}>Forgot Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        onChangeText={handleUsernameChange}
                        value={state.username}
                    />
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={handleTokenSending}
                    >
                        <Text style={styles.buttonText}>Send Email</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <Text style={{color : '#F0EAD6', fontSize: 30, marginBottom:15}}>Enter Verification Code</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter 6 digit code"
                        onChangeText={handleCodeChange}
                        value={state.code}
                        keyboardType="numeric"
                        maxLength={6}
                    />
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={handleTokenSending} // Assuming you want to resend the code on this button press
                    >
                        <Text style={styles.buttonText}>Resend Code</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={handleTokenVerification} // Assuming you want to verify the code on this button press
                    >
                        <Text style={styles.buttonText}>Verify Code</Text>
                    </TouchableOpacity>
                </>
            )}
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

export default ForgotPasswordComponent;
