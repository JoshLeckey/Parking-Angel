import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import LoginComponent from '../components/auth_components/LoginComponent';
import RegisterComponent from '../components/auth_components/RegisterComponent';
import ForgotPasswordComponent from '../components/auth_components/ForgotPasswordComponent';
import PasswordResetComponent from '../components/auth_components/PasswordResetComponent';

const AuthScreen = ({ navigation }) => {
    const [state, setState] = useState({
        currentScreen: "login", // "login", "register", "forgotPassword", "passwordReset"
        token: "",
        username: ""
    });

    const toggleScreen = useCallback(() => {
        setState(prevState => ({ ...prevState, currentScreen: prevState.currentScreen === "login" ? "register" : "login" }));
    }, []);

    const onLoginSuccess = useCallback(() => {
        navigation.navigate("MapScreen");
    }, [navigation]);

    const onForgotSuccess = useCallback((token, username) => {
        setState(prevState => ({ ...prevState, currentScreen: "passwordReset", token, username }));
    }, []);

    const toggleForgotPassword = useCallback(() => {
        setState(prevState => ({ ...prevState, currentScreen: "forgotPassword" }));
    }, []);

    const onRegisterSuccess = useCallback(() => {
        setState(prevState => ({ ...prevState, currentScreen: "login" }));
    }, []);

    const onResetSuccess = useCallback(() => {
        setState(prevState => ({ ...prevState, currentScreen: "login" }));
    }, []);

    let componentToRender;
    switch (state.currentScreen) {
        case "login":
            componentToRender = <LoginComponent
                onLoginSuccess={onLoginSuccess}
                onNavigateToRegister={toggleScreen}
                onNavigateToForgotPassword={toggleForgotPassword}
            />;
            break;
        case "register":
            componentToRender = <RegisterComponent
                onRegisterSuccess={onRegisterSuccess}
                onNavigateToLogin={toggleScreen}
            />;
            break;
        case "forgotPassword":
            componentToRender = <ForgotPasswordComponent
                onForgotSuccess={onForgotSuccess}
            />;
            break;
        case "passwordReset":
            componentToRender = <PasswordResetComponent 
                token={state.token}
                username={state.username}
                onResetSuccess={onResetSuccess}
            />;
            break;
        default:
            componentToRender = null;
    }

    return (
        <View style={{ flex: 1 }}>
            {componentToRender}
        </View>
    );
};

export default AuthScreen;