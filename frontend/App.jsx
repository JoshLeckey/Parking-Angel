import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from './screens/MapScreen';
import AuthScreen from './screens/AuthScreen';
import HelpSettingsComponent from './components/settings_components/HelpSettingsComponent';

const Stack = createStackNavigator();

function App() {
  // Create a ref for the navigation container
  const navigationRef = useRef(null);

  // State to simulate user authentication status
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    // Placeholder for an auth check, could be replaced with actual logic
    // Simulate checking auth status with a delay
    setTimeout(() => {
      setIsLoggedIn(false); // Change to true to simulate an authenticated user
    }, 1000); // Simulating async operation, e.g., fetching from storage or API
  }, []);

  useEffect(() => {
    // Once isLoggedIn is determined, navigate to the appropriate screen
    if (isLoggedIn !== null) {
      const routeName = isLoggedIn ? "MapScreen" : "HelpSettingsComponent";
      navigationRef.current?.navigate(routeName);
    }
  }, [isLoggedIn]); // Re-run when isLoggedIn changes

  return (
    <NavigationContainer ref={navigationRef}>
      <RootNavigator />
    </NavigationContainer>
  );
}

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HelpSettingsComponent" component={HelpSettingsComponent} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Navigator>
  );
}

export default App;
